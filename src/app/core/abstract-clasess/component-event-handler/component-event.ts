export interface ComponentEvent<T, K> {
  // @param componentName: Nome do componente.
  // @param type: Tipo de evento
  // @data data: dados a serem passados pelo componente
  componentName?: string;
  action: T;
  data: K;
}
