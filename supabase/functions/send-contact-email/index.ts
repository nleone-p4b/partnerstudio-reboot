import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

// Simple in-memory rate limiter (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per minute per IP

function getRateLimitKey(req: Request): string {
  // Try to get real IP from headers (Cloudflare/proxy headers)
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  const xForwardedFor = req.headers.get("x-forwarded-for");
  const xRealIp = req.headers.get("x-real-ip");
  
  return cfConnectingIp || xForwardedFor?.split(",")[0]?.trim() || xRealIp || "unknown";
}

function checkRateLimit(clientId: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(clientId);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

// HTML entity escape function to prevent XSS
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return text.replace(/[&<>"'/]/g, (char) => htmlEntities[char] || char);
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientId = getRateLimitKey(req);
  const rateLimitResult = checkRateLimit(clientId);
  
  if (!rateLimitResult.allowed) {
    console.warn("Rate limit exceeded for client:", clientId);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Troppe richieste. Riprova tra qualche minuto." 
      }),
      {
        status: 429,
        headers: { 
          "Content-Type": "application/json", 
          "Retry-After": String(rateLimitResult.retryAfter),
          ...corsHeaders 
        },
      }
    );
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service not configured");
    }

    const resend = new Resend(RESEND_API_KEY);
    
    const { name, email, phone, company, message }: ContactFormRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      console.error("Missing required fields:", { name: !!name, email: !!email, message: !!message });
      throw new Error("Missing required fields: name, email, and message are required");
    }

    // Trim and validate inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone?.trim();
    const trimmedCompany = company?.trim();
    const trimmedMessage = message.trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      console.error("Invalid email format:", trimmedEmail);
      throw new Error("Invalid email format");
    }

    // Validate field lengths
    if (trimmedName.length > 100 || trimmedEmail.length > 255 || trimmedMessage.length > 5000) {
      console.error("Field length exceeded");
      throw new Error("Field length exceeded maximum allowed");
    }

    console.log("Sending contact email for:", { name: trimmedName, email: trimmedEmail, company: trimmedCompany });

    // Sanitize all user inputs for HTML rendering
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safePhone = trimmedPhone ? escapeHtml(trimmedPhone) : null;
    const safeCompany = trimmedCompany ? escapeHtml(trimmedCompany) : null;
    const safeMessage = escapeHtml(trimmedMessage);

    const emailResponse = await resend.emails.send({
      from: "NL Partner Studio <onboarding@resend.dev>",
      to: ["nicola.leone.techbiz@gmail.com"],
      subject: `Nuova richiesta di consulenza da ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8B7355; border-bottom: 2px solid #C4A574; padding-bottom: 10px;">
            Nuova Richiesta di Consulenza
          </h1>
          
          <div style="background-color: #FAF8F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Dettagli del Contatto</h2>
            
            <p><strong>Nome:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            ${safePhone ? `<p><strong>Telefono:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>` : ''}
            ${safeCompany ? `<p><strong>Azienda:</strong> ${safeCompany}</p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #E5E0D8; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">Messaggio</h2>
            <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            Questa email è stata inviata dal form di contatto di NL Partner Studio
          </p>
        </div>
      `,
      reply_to: trimmedEmail,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
