import { PageHttpError } from './page-http-error.model';

export interface PageResult<ConteudoT, TotalT> {
  tipo?: string;
  conteudo?: ConteudoT;
  error?: PageHttpError;
  total?: TotalT;
  resultado?: string;
}
