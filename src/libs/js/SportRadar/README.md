


# Sportradar API Wrapper

Esta é uma biblioteca JavaScript para facilitar o uso da API da Sportradar com suporte a cookies, utilizando **Axios** e **axios-cookiejar-support**. A biblioteca foi desenvolvida em **ECMAScript 14** e inclui métodos para acessar informações de esportes, países, torneios, estatísticas de temporada, times e partidas.

## Requisitos

- **Node.js** v14 ou superior
- **Axios** com suporte a cookies (axios-cookiejar-support)
- ECMAScript 14+

## Instalação

1. **Clone o repositório ou copie os arquivos do projeto.**

2. **Instale as dependências:**
   ```bash
   npm install axios axios-cookiejar-support tough-cookie
   ```

## Configuração

O construtor da classe `SportradarAPI` aceita os seguintes parâmetros:
- `baseURL` (string): A URL base da API. Exemplo: `https://stats.fn.sportradar.com/bet365`.
- `locale` (string) (opcional): O idioma da API. O padrão é `br` (português). Pode ser alterado para `en` (inglês), entre outros.
- `timezone` (string) (opcional): O fuso horário a ser utilizado nas requisições. O padrão é `America:Montevideo`.

### Exemplo de uso:

```javascript
import SportradarAPI from './SportradarAPI';

// Inicializando a API com o locale em português e timezone de Montevideo.
const api = new SportradarAPI('https://stats.fn.sportradar.com/bet365');

// Obtendo a lista de esportes
api.getSportsList().then(data => console.log(data));

// Obtendo países suportados para um esporte
api.getSupportedCountries(1).then(data => console.log(data));

// Obtendo detalhes de uma partida
api.getMatchDetails(123456).then(data => console.log(data));
```

## Métodos Disponíveis

### `getSportsList()`
- **Descrição**: Retorna a lista de esportes suportados.
- **Parâmetros**: Nenhum.
- **Retorno**: Um array de objetos com esportes e IDs.
  
### `getSupportedCountries(sportId)`
- **Descrição**: Retorna a lista de países suportados para um esporte específico.
- **Parâmetros**:
  - `sportId` (number): O ID do esporte.
- **Retorno**: Um array de países suportados para o esporte.

### `getCountryDetails(countryId)`
- **Descrição**: Retorna os detalhes de um país.
- **Parâmetros**:
  - `countryId` (number): O ID do país.
- **Retorno**: Objeto com detalhes do país.

### `getTournaments(sportId, countryId)`
- **Descrição**: Retorna a lista de torneios disponíveis para o esporte e país.
- **Parâmetros**:
  - `sportId` (number): O ID do esporte.
  - `countryId` (number): O ID do país.
- **Retorno**: Array de torneios.

### `getSeasonMeta(tournamentId)`
- **Descrição**: Obtém metadados sobre uma temporada específica.
- **Parâmetros**:
  - `tournamentId` (number): O ID do torneio.
- **Retorno**: Objeto com metadados da temporada.

### `getSeasonTables(tournamentId)`
- **Descrição**: Retorna a tabela de classificação dos times.
- **Parâmetros**:
  - `tournamentId` (number): O ID do torneio.
- **Retorno**: Objeto contendo a tabela de classificação.

### `getFormTable(tournamentId)`
- **Descrição**: Retorna a tabela de forma (desempenho recente dos times).
- **Parâmetros**:
  - `tournamentId` (number): O ID do torneio.
- **Retorno**: Objeto contendo a tabela de forma.

### `getLeagueSummary(tournamentId)`
- **Descrição**: Retorna o resumo da liga para uma temporada.
- **Parâmetros**:
  - `tournamentId` (number): O ID do torneio.
- **Retorno**: Resumo da liga.

### `getUniqueTeamStats(tournamentId)`
- **Descrição**: Retorna estatísticas detalhadas dos times.
- **Parâmetros**:
  - `tournamentId` (number): O ID do torneio.
- **Retorno**: Objeto com estatísticas dos times.

### `getGoalsData(tournamentId)`
- **Descrição**: Retorna dados de gols (totais, médias).
- **Parâmetros**:
  - `tournamentId` (number): O ID do torneio.
- **Retorno**: Dados de gols da temporada.

### `getOverUnder(tournamentId)`
- **Descrição**: Retorna dados de over/under para o torneio.
- **Parâmetros**:
  - `tournamentId` (number): O ID do torneio.
- **Retorno**: Dados de over/under (acima/abaixo de um valor de gols).

### `getTeamNextGames(teamId)`
- **Descrição**: Retorna os próximos jogos de um time específico.
- **Parâmetros**:
  - `teamId` (number): O ID do time.
- **Retorno**: Próximos jogos do time.

### `getMatchDetails(matchId)`
- **Descrição**: Retorna os detalhes de uma partida específica.
- **Parâmetros**:
  - `matchId` (number): O ID da partida.
- **Retorno**: Detalhes da partida (times, placar, data).

## Cabeçalhos de Requisição

Todas as requisições feitas pela biblioteca incluem os seguintes cabeçalhos para simular um navegador moderno:

```json
{
  "accept": "*/*",
  "accept-encoding": "gzip, deflate, br, zstd",
  "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
  "cache-control": "no-cache",
  "origin": "https://s5.sir.sportradar.com",
  "pragma": "no-cache",
  "priority": "u=1, i",
  "referer": "https://s5.sir.sportradar.com/",
  "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"macOS\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
}
```

## Contribuição

Sinta-se à vontade para contribuir com o projeto enviando pull requests ou relatando problemas.

## Licença

Este projeto está licenciado sob a licença MIT.
