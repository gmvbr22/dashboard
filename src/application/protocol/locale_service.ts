/**
 * Serviço de local, usado para traduzir mensagem e etc.
 */
export abstract class LocaleService {
  /**
   * Retorna a mensagem traduzida
   *
   * @param id ID da mensagem
   * @param locale Local da mensagem ex: pt_br
   */
  abstract getMessage(id: string, locale: string): string;
}
