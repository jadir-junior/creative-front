export interface Message {
  closable?: boolean;
  detail?: string;
  icon?: string;
  id?: string;
  key?: string;
  life?: number;
  severity?: 'success' | 'info' | 'warm' | 'error';
  sticky?: boolean;
  summary?: string;
}
