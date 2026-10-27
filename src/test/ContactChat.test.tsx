import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { ContactChat } from '../components/studio/ContactChat';
vi.mock('@/integrations/supabase/client', () => ({supabase:{functions:{invoke:vi.fn()}}}));
describe('Chat dismissal', () => {
 beforeEach(() => {sessionStorage.clear();Element.prototype.scrollTo=vi.fn();vi.useFakeTimers();});
 afterEach(() => {vi.useRealTimers();});
 it('does not reopen on the automatic timer after manually opening and closing', () => {
  render(<ContactChat ready/>);
  fireEvent.click(screen.getByRole('button',{name:'Apri chat'}));
  fireEvent.click(screen.getByRole('button',{name:'Chiudi chat'}));
  act(() => {vi.advanceTimersByTime(5000);});
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(sessionStorage.getItem('studio-chat-dismissed')).toBe('yes');
  fireEvent.click(screen.getByRole('button',{name:'Apri chat'}));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
 });
});