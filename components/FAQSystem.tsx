export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  category: string;
  steps?: string[];
  relatedLinks?: { text: string; url: string }[];
}

export const govFAQ: FAQItem[] = [
  {
    id: "cpf-emitir",
    question: "Como fazer CPF online?",
    answer: "Você pode emitir ou consultar seu CPF gratuitamente pelo portal oficial do governo.",
    keywords: ["cpf", "documento", "emitir", "fazer", "online", "receita federal"],
    category: "Documentos",
    steps: [
      "Acesse o site gov.br/receitafederal",
      "Clique em 'CPF' no menu principal",
      "Selecione 'Emitir CPF' ou 'Consultar CPF'",
      "Faça login com sua conta gov.br ou crie uma conta",
      "Preencha os dados solicitados",
      "Confirme as informações e finalize",
      "O documento será enviado por email ou pode ser baixado na hora"
    ],
    relatedLinks: [
      { text: "Portal da Receita Federal", url: "gov.br/receitafederal" },
      { text: "Criar conta gov.br", url: "acesso.gov.br" }
    ]
  },
  {
    id: "inss-consultar",
    question: "Como acessar o Meu INSS?",
    answer: "O Meu INSS é o portal onde você consulta benefícios, agenda perícias e acompanha processos previdenciários.",
    keywords: ["inss", "aposentadoria", "beneficio", "previdencia", "extrato", "meu inss"],
    category: "Previdência",
    steps: [
      "Acesse gov.br/inss ou baixe o app 'Meu INSS'",
      "Clique em 'Entrar com gov.br'",
      "Digite seu CPF e senha da conta gov.br",
      "Na tela inicial, você verá suas informações previdenciárias",
      "Use o menu para acessar: Extratos, Agendamentos, Benefícios, etc.",
      "Para agendar perícia: vá em 'Agendar Perícia Médica'",
      "Para consultar benefícios: clique em 'Consultar Benefícios'"
    ],
    relatedLinks: [
      { text: "Portal do INSS", url: "gov.br/inss" },
      { text: "Baixar app Meu INSS", url: "play.google.com" }
    ]
  },
  {
    id: "sus-cartao",
    question: "Como fazer o Cartão Nacional de Saúde SUS?",
    answer: "O Cartão Nacional de Saúde (CNS) é seu documento para usar os serviços do SUS.",
    keywords: ["sus", "cartao", "saude", "nacional", "cns", "conecte sus"],
    category: "Saúde",
    steps: [
      "Baixe o app 'ConecteSUS' ou acesse conectesus.saude.gov.br",
      "Clique em 'Fazer Cadastro'",
      "Informe seus dados pessoais (CPF, RG, etc.)",
      "Adicione uma foto do seu rosto",
      "Confirme seus dados e finalize o cadastro",
      "Seu CNS será gerado automaticamente",
      "O cartão digital fica disponível no app para usar nas consultas"
    ],
    relatedLinks: [
      { text: "ConecteSUS", url: "conectesus.saude.gov.br" },
      { text: "Portal da Saúde", url: "gov.br/saude" }
    ]
  },
  {
    id: "certidao-nascimento",
    question: "Como tirar certidão de nascimento online?",
    answer: "Você pode solicitar a 2ª via da certidão de nascimento online pelo portal dos cartórios.",
    keywords: ["certidao", "nascimento", "cartorio", "online", "2 via", "documento"],
    category: "Documentos",
    steps: [
      "Acesse gov.br/cartorio ou portal.cartorio.org.br",
      "Clique em 'Certidões Online'",
      "Selecione 'Certidão de Nascimento'",
      "Digite o CPF da pessoa ou dados do cartório de origem",
      "Preencha os dados solicitados",
      "Escolha entre receber por email (digital) ou pelos Correios",
      "Faça o pagamento da taxa",
      "Aguarde o documento conforme a opção escolhida"
    ],
    relatedLinks: [
      { text: "Portal dos Cartórios", url: "gov.br/cartorio" },
      { text: "Central dos Cartórios", url: "portal.cartorio.org.br" }
    ]
  },
  {
    id: "auxilio-emergencial",
    question: "Como consultar benefícios sociais?",
    answer: "Você pode consultar Auxílio Brasil, Bolsa Família e outros benefícios através dos canais oficiais.",
    keywords: ["auxilio", "beneficio", "bolsa familia", "social", "caixa", "consultar"],
    category: "Benefícios",
    steps: [
      "Baixe o app 'Caixa Tem' ou 'Auxílio Brasil'",
      "Acesse também cadastrounico.saude.gov.br",
      "Faça login com seu CPF e senha",
      "Na tela inicial, veja seus benefícios ativos",
      "Para consultar pagamentos: clique em 'Calendário de Pagamentos'",
      "Para atualizar dados: vá em 'Meus Dados' ou procure um CRAS",
      "Para dúvidas: use o chat do app ou ligue 111"
    ],
    relatedLinks: [
      { text: "Cadastro Único", url: "cadastrounico.saude.gov.br" },
      { text: "Portal da Caixa", url: "caixa.gov.br" }
    ]
  },
  {
    id: "servicos-online",
    question: "Quais serviços posso fazer online no gov.br?",
    answer: "O portal gov.br centraliza mais de 4.000 serviços públicos digitais.",
    keywords: ["servicos", "online", "gov.br", "portal", "digital", "governo"],
    category: "Geral",
    steps: [
      "Acesse gov.br",
      "Use a barra de busca para encontrar o serviço",
      "Ou navegue pelas categorias: Documentos, Saúde, Educação, etc.",
      "Clique no serviço desejado",
      "Faça login com sua conta gov.br (se necessário)",
      "Siga as instruções específicas de cada serviço",
      "Alguns serviços podem ser feitos sem login"
    ],
    relatedLinks: [
      { text: "Portal gov.br", url: "gov.br" },
      { text: "Criar conta gov.br", url: "acesso.gov.br" }
    ]
  },
  {
    id: "conta-govbr",
    question: "Como criar conta no gov.br?",
    answer: "A conta gov.br é sua identidade digital para acessar serviços do governo.",
    keywords: ["conta", "gov.br", "cadastro", "registro", "login", "acesso"],
    category: "Acesso",
    steps: [
      "Acesse acesso.gov.br",
      "Clique em 'Criar sua conta gov.br'",
      "Digite seu CPF e uma senha forte",
      "Confirme seu email e número de celular",
      "Escolha o nível de confiabilidade (Bronze, Prata ou Ouro)",
      "Para nível Ouro: valide sua identidade com selfie + documento",
      "Sua conta estará pronta para usar nos serviços do governo"
    ],
    relatedLinks: [
      { text: "Criar conta gov.br", url: "acesso.gov.br" },
      { text: "Portal gov.br", url: "gov.br" }
    ]
  },
  {
    id: "sisu-enem",
    question: "Como se inscrever no SISU?",
    answer: "O SISU é o sistema de seleção para universidades públicas usando a nota do ENEM.",
    keywords: ["sisu", "enem", "universidade", "inscricao", "faculdade", "ensino superior"],
    category: "Educação",
    steps: [
      "Acesse sisu.mec.gov.br",
      "Faça login com sua conta gov.br",
      "Digite o número de inscrição e senha do ENEM",
      "Escolha até 2 opções de curso e universidade",
      "Ordene suas opções por prioridade",
      "Acompanhe as notas de corte diariamente",
      "Confirme sua inscrição antes do prazo final"
    ],
    relatedLinks: [
      { text: "Portal do SISU", url: "sisu.mec.gov.br" },
      { text: "Portal do MEC", url: "gov.br/mec" }
    ]
  },
  {
    id: "fgts-consultar",
    question: "Como consultar saldo do FGTS?",
    answer: "Você pode consultar e acompanhar seu FGTS pelo app ou site da Caixa.",
    keywords: ["fgts", "saldo", "consultar", "caixa", "trabalho", "conta"],
    category: "Trabalho",
    steps: [
      "Baixe o app 'FGTS' da Caixa ou acesse fgts.caixa.gov.br",
      "Faça login com seu CPF e senha",
      "Se não tem senha, cadastre uma nova",
      "Na tela inicial, veja o saldo de todas as contas",
      "Para extrato detalhado: clique em 'Extrato'",
      "Para saque: verifique se tem direito e clique em 'Saque'",
      "Para dúvidas: use o chat ou ligue 0800 726 0207"
    ],
    relatedLinks: [
      { text: "Portal do FGTS", url: "fgts.caixa.gov.br" },
      { text: "Caixa Econômica", url: "caixa.gov.br" }
    ]
  },
  {
    id: "detran-cnh",
    question: "Como renovar CNH online?",
    answer: "A renovação da CNH pode ser feita online pelo portal do DETRAN do seu estado.",
    keywords: ["cnh", "renovar", "habilitacao", "detran", "online", "carteira"],
    category: "Documentos",
    steps: [
      "Acesse o site do DETRAN do seu estado (ex: detran.sp.gov.br)",
      "Procure por 'Renovação de CNH' ou 'Serviços Online'",
      "Faça login com seus dados ou conta gov.br",
      "Agende os exames médico e psicotécnico",
      "Realize os exames nos locais credenciados",
      "Após aprovação, pague as taxas online",
      "Acompanhe a produção e entrega da nova CNH"
    ],
    relatedLinks: [
      { text: "DETRAN-SP", url: "detran.sp.gov.br" },
      { text: "Portal gov.br", url: "gov.br" }
    ]
  },
  {
    id: "prouni-inscricao",
    question: "Como se inscrever no ProUni?",
    answer: "O ProUni oferece bolsas de estudo em universidades privadas para estudantes de baixa renda.",
    keywords: ["prouni", "bolsa", "universidade", "inscricao", "ensino superior", "privada"],
    category: "Educação",
    steps: [
      "Acesse prouniportal.mec.gov.br",
      "Verifique se atende aos critérios de renda e escolaridade",
      "Faça sua inscrição no período determinado",
      "Informe sua nota do ENEM (mínimo 450 pontos)",
      "Escolha até 2 opções de curso e turno",
      "Acompanhe os resultados nas datas divulgadas",
      "Se selecionado, comprove as informações na universidade"
    ],
    relatedLinks: [
      { text: "Portal do ProUni", url: "prouniportal.mec.gov.br" },
      { text: "MEC", url: "gov.br/mec" }
    ]
  },
  {
    id: "rg-digital",
    question: "Como fazer RG digital?",
    answer: "O RG digital (CIN) é o novo documento de identidade nacional unificado.",
    keywords: ["rg", "identidade", "cin", "digital", "documento", "novo"],
    category: "Documentos",
    steps: [
      "Acesse o portal do órgão emissor do seu estado",
      "Para SP: acesse portal.iirgd.sp.gov.br",
      "Agende um atendimento presencial",
      "Leve documentos: certidão de nascimento, CPF e comprovante de residência",
      "Realize o atendimento no local e horário agendados",
      "Faça biometria e foto no local",
      "Pague a taxa (se aplicável) e aguarde a entrega"
    ],
    relatedLinks: [
      { text: "RG Digital SP", url: "portal.iirgd.sp.gov.br" },
      { text: "Portal gov.br", url: "gov.br" }
    ]
  },
  {
    id: "auxilio-brasil",
    question: "Como consultar Auxílio Brasil/Bolsa Família?",
    answer: "O programa social pode ser consultado pelo app ou sites oficiais.",
    keywords: ["auxilio brasil", "bolsa familia", "programa social", "consultar", "beneficio"],
    category: "Benefícios",
    steps: [
      "Baixe o app 'Auxílio Brasil' ou 'Caixa Tem'",
      "Acesse também sa.caixa.gov.br",
      "Digite seu CPF e senha (ou crie uma conta)",
      "Consulte informações do benefício na tela inicial",
      "Veja calendário de pagamentos e valores",
      "Para dúvidas, use o atendimento virtual ou ligue 111",
      "Para atualização de dados, procure um CRAS"
    ],
    relatedLinks: [
      { text: "Site da Caixa", url: "sa.caixa.gov.br" },
      { text: "Cadastro Único", url: "cadastrounico.saude.gov.br" }
    ]
  },
  {
    id: "passport-brasileiro",
    question: "Como solicitar passaporte brasileiro?",
    answer: "O passaporte brasileiro é solicitado através da Polícia Federal.",
    keywords: ["passaporte", "viagem", "policia federal", "documento", "internacional"],
    category: "Documentos",
    steps: [
      "Acesse servicos.dpf.gov.br",
      "Clique em 'Passaporte Comum'",
      "Preencha o formulário online",
      "Pague a GRU (taxa) no banco",
      "Agende atendimento em uma unidade da PF",
      "Compareça no local com documentos originais",
      "Aguarde de 6 a 20 dias úteis para retirada"
    ],
    relatedLinks: [
      { text: "Polícia Federal", url: "servicos.dpf.gov.br" },
      { text: "Portal gov.br", url: "gov.br" }
    ]
  },
  {
    id: "titulo-eleitor",
    question: "Como tirar título de eleitor online?",
    answer: "O título de eleitor pode ser solicitado online pelo TSE para quem nunca teve.",
    keywords: ["titulo eleitor", "votar", "tse", "eleitoral", "primeira via"],
    category: "Documentos",
    steps: [
      "Acesse titulo.tse.jus.br",
      "Clique em 'Solicitar Alistamento Eleitoral'",
      "Preencha o formulário com seus dados",
      "Anexe foto e documentos digitalizados",
      "Envie a solicitação online",
      "Acompanhe o status pelo mesmo site",
      "Receba o título por e-mail ou retire no cartório eleitoral"
    ],
    relatedLinks: [
      { text: "TSE", url: "titulo.tse.jus.br" },
      { text: "Portal do TSE", url: "tse.jus.br" }
    ]
  }
];

export class FAQService {
  // Novo serviço de IA para interpretar perguntas
  static interpretQuestion(query: string): { interpretedQuery: string; suggestions: string[]; confidence: number } {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Dicionário de sinônimos e variações comuns
    const synonyms: { [key: string]: string[] } = {
      'cpf': ['cadastro pessoa fisica', 'documento', 'registro pessoa', 'pf'],
      'inss': ['previdencia', 'aposentadoria', 'beneficio inss', 'seguro social'],
      'sus': ['saude publica', 'sistema saude', 'cartao sus', 'sus cartao'],
      'certidao': ['documento civil', 'registro civil', '2 via', 'segunda via'],
      'auxilio': ['beneficio social', 'bolsa familia', 'auxilio brasil', 'ajuda governo'],
      'passaporte': ['documento viagem', 'viajar exterior', 'documento internacional'],
      'conta digital': ['banco digital', 'conta gov', 'conta governamental'],
      'fazer': ['emitir', 'tirar', 'solicitar', 'pedir', 'obter', 'conseguir'],
      'consultar': ['verificar', 'checar', 'ver', 'acompanhar', 'conferir'],
      'online': ['internet', 'digital', 'site', 'app', 'aplicativo']
    };
    
    // Padrões comuns de perguntas
    const patterns = [
      {
        pattern: /como\s+(fazer|tirar|emitir|solicitar|pedir)\s+(.+)/i,
        intent: 'how_to_obtain',
        confidence: 0.9
      },
      {
        pattern: /como\s+(consultar|verificar|ver|checar)\s+(.+)/i,
        intent: 'how_to_check',
        confidence: 0.9
      },
      {
        pattern: /(preciso|quero|gostaria)\s+(de\s+)?(fazer|tirar|emitir)\s+(.+)/i,
        intent: 'want_to_obtain',
        confidence: 0.8
      },
      {
        pattern: /(onde|qual\s+site|qual\s+portal)\s+.*(fazer|consultar|tirar)\s+(.+)/i,
        intent: 'where_to_do',
        confidence: 0.8
      },
      {
        pattern: /(.+)\s+(online|digital|internet|app|aplicativo)/i,
        intent: 'digital_service',
        confidence: 0.7
      }
    ];
    
    // Expandir query com sinônimos
    let expandedQuery = normalizedQuery;
    for (const [key, values] of Object.entries(synonyms)) {
      for (const synonym of values) {
        if (expandedQuery.includes(synonym)) {
          expandedQuery += ` ${key}`;
          break;
        }
      }
    }
    
    // Detectar intenção
    let detectedIntent = 'general';
    let confidence = 0.5;
    let extractedTerms: string[] = [];
    
    for (const { pattern, intent, confidence: patternConfidence } of patterns) {
      const match = normalizedQuery.match(pattern);
      if (match) {
        detectedIntent = intent;
        confidence = patternConfidence;
        if (match[2]) extractedTerms.push(match[2]);
        if (match[3]) extractedTerms.push(match[3]);
        if (match[4]) extractedTerms.push(match[4]);
        break;
      }
    }
    
    // Gerar pergunta interpretada
    let interpretedQuery = expandedQuery;
    
    switch (detectedIntent) {
      case 'how_to_obtain':
        interpretedQuery = `como fazer ${extractedTerms.join(' ')} online`;
        break;
      case 'how_to_check':
        interpretedQuery = `como consultar ${extractedTerms.join(' ')} online`;
        break;
      case 'want_to_obtain':
        interpretedQuery = `como fazer ${extractedTerms.join(' ')}`;
        break;
      case 'where_to_do':
        interpretedQuery = `onde fazer ${extractedTerms.join(' ')} online`;
        break;
    }
    
    // Gerar sugestões relacionadas
    const suggestions = this.generateSuggestions(interpretedQuery);
    
    return {
      interpretedQuery,
      suggestions,
      confidence
    };
  }
  
  private static generateSuggestions(query: string): string[] {
    const lowerQuery = query.toLowerCase();
    const suggestions: string[] = [];
    
    // Sugestões baseadas em termos-chave
    if (lowerQuery.includes('cpf')) {
      suggestions.push('Como emitir CPF online?', 'Como consultar situação do CPF?');
    }
    if (lowerQuery.includes('inss')) {
      suggestions.push('Como acessar o Meu INSS?', 'Como consultar benefícios do INSS?');
    }
    if (lowerQuery.includes('sus')) {
      suggestions.push('Como fazer Cartão Nacional de Saúde SUS?', 'Como marcar consulta pelo SUS?');
    }
    if (lowerQuery.includes('certidao')) {
      suggestions.push('Como tirar certidão de nascimento online?', 'Como obter certidão de casamento?');
    }
    if (lowerQuery.includes('auxilio') || lowerQuery.includes('beneficio')) {
      suggestions.push('Como consultar benefícios sociais?', 'Como solicitar Auxílio Brasil?');
    }
    
    return suggestions.slice(0, 3); // Máximo 3 sugestões
  }

  static searchFAQ(query: string): FAQItem | null {
    // Primeiro, interpreta a pergunta usando IA
    const interpretation = this.interpretQuestion(query);
    
    // Busca usando tanto a pergunta original quanto a interpretada
    const searchQueries = [query, interpretation.interpretedQuery];
    
    for (const searchQuery of searchQueries) {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      
      // Busca exata por pergunta
      const exactMatch = govFAQ.find(item => 
        item.question.toLowerCase().includes(normalizedQuery) ||
        normalizedQuery.includes(item.question.toLowerCase().slice(0, 10))
      );
      
      if (exactMatch) return exactMatch;
      
      // Busca por palavras-chave com pontuação
      const keywordMatches = govFAQ.map(item => {
        const score = item.keywords.reduce((acc, keyword) => {
          if (normalizedQuery.includes(keyword.toLowerCase())) {
            return acc + keyword.length; // Palavras mais específicas têm mais peso
          }
          return acc;
        }, 0);
        
        return { item, score };
      }).filter(match => match.score > 0);
      
      if (keywordMatches.length > 0) {
        // Retorna o match com maior pontuação
        keywordMatches.sort((a, b) => b.score - a.score);
        return keywordMatches[0].item;
      }
      
      // Busca parcial em qualquer palavra
      const partialMatch = govFAQ.find(item => {
        const queryWords = normalizedQuery.split(' ');
        return queryWords.some(word => 
          word.length > 2 && item.keywords.some(keyword => 
            keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase())
          )
        );
      });
      
      if (partialMatch) return partialMatch;
    }
    
    return null;
  }
  
  static generateAIResponse(query: string): string {
    // Interpreta a pergunta primeiro
    const interpretation = this.interpretQuestion(query);
    const lowerQuery = query.toLowerCase();
    const interpretedQuery = interpretation.interpretedQuery.toLowerCase();
    
    // Exibe interpretação se a confiança for alta e for diferente da original
    let response = '';
    if (interpretation.confidence > 0.7 && interpretation.interpretedQuery !== query) {
      response += `💡 *Entendi que você quer saber: "${interpretation.interpretedQuery}"*\n\n`;
    }
    
    // Adiciona sugestões se houver
    if (interpretation.suggestions.length > 0) {
      response += `**Perguntas relacionadas que posso responder:**\n`;
      interpretation.suggestions.forEach((suggestion, index) => {
        response += `${index + 1}. ${suggestion}\n`;
      });
      response += '\n';
    }
    
    // Respostas específicas por temas (usando tanto query original quanto interpretada)
    const searchText = `${lowerQuery} ${interpretedQuery}`;
    
    if (searchText.includes('multa') || searchText.includes('infração') || searchText.includes('pontos carteira')) {
      response += `Para consultar multas e pontos na carteira:

1. Acesse o portal do DETRAN do seu estado
2. Entre na seção "Consulta de Multas" ou "CNH"
3. Informe CPF/CNH e dados solicitados
4. Veja multas pendentes e pontos na carteira
5. Para recorrer: siga as instruções no próprio portal

📱 Dica: Use também o app "CDT" (Carteira Digital de Trânsito) para consultas rápidas.`;
      return response;
    }
    
    if (searchText.includes('comprovante') && (searchText.includes('renda') || searchText.includes('salario'))) {
      response += `Para obter comprovante de renda:

1. **Trabalhador CLT**: Solicite ao RH da empresa
2. **Autônomo**: Acesse gov.br/receitafederal > Declaração de Imposto de Renda
3. **Aposentado/Pensionista**: Use o app "Meu INSS" > Extrato de Pagamento
4. **Servidor Público**: Portal do órgão empregador
5. **MEI**: Portal do Empreendedor > Relatórios

🔗 Links: gov.br/receitafederal | gov.br/inss`;
      return response;
    }
    
    if (searchText.includes('emprego') || searchText.includes('trabalho') || searchText.includes('vagas')) {
      response += `Para buscar emprego através de canais oficiais:

1. Acesse sine.rs.gov.br ou o portal do SINE do seu estado
2. Cadastre-se com seus dados e currículo
3. Busque vagas por área/região
4. Para o auxílio desemprego: use o app "Carteira de Trabalho Digital"
5. Para capacitação: veja cursos gratuitos no SENAI/SENAC

📞 Atendimento: Procure uma agência do trabalhador ou SINE da sua cidade.`;
      return response;
    }
    
    if (searchText.includes('imposto') || searchText.includes('declaração') || searchText.includes('receita')) {
      response += `Para questões relacionadas a impostos:

1. Acesse gov.br/receitafederal
2. **Declaração IR**: Use o programa IRPF ou app "Meu Imposto de Renda"
3. **CPF**: Seção "Cadastros" > "CPF"
4. **Restituição**: Consulte pelo CPF na seção específica
5. **Dúvidas**: Use o chat virtual ou ligue 146

💡 Prazo da declaração: Geralmente de março a maio de cada ano.`;
      return response;
    }
    
    if (searchText.includes('carteira') && searchText.includes('trabalho')) {
      response += `Para a Carteira de Trabalho Digital:

1. Baixe o app "Carteira de Trabalho Digital"
2. Faça login com conta gov.br (nível prata ou ouro)
3. Consulte contratos, seguro-desemprego e abono salarial
4. Para solicitar seguro-desemprego: use o próprio app
5. Para baixar PDF: vá em "Contratos" > "Gerar PDF"

🆔 Importante: Precisa ter conta gov.br com nível de confiabilidade adequado.`;
      return response;
    }
    
    // Respostas por contexto geral
    if (searchText.includes('como') && searchText.includes('fazer')) {
      response += `Para "${query}", recomendo:

1. Acesse gov.br e use a busca específica
2. Verifique se o serviço está disponível online
3. Se necessário, agende atendimento presencial
4. Tenha em mãos: CPF, RG e comprovante de residência
5. Para dúvidas: ligue 111 (central gov.br)

🌐 A maioria dos serviços estão digitalizados no portal gov.br.`;
      return response;
    }
    
    if (searchText.includes('onde') || searchText.includes('local')) {
      response += `Para encontrar locais de atendimento:

1. Acesse gov.br > busque pelo serviço
2. Na página do serviço, procure "Locais de Atendimento"
3. Use o mapa interativo para encontrar unidades próximas
4. Verifique horários e se precisa agendar
5. Para órgãos estaduais: acesse o portal do seu estado

📍 Dica: O app "gov.br" tem mapa com geolocalização.`;
      return response;
    }
    
    if (searchText.includes('prazo') || searchText.includes('tempo') || searchText.includes('demora')) {
      response += `Sobre prazos de serviços públicos:

• **Serviços online**: Geralmente instantâneos
• **Documentos digitais**: 1 a 5 dias úteis
• **Documentos físicos**: 5 a 30 dias úteis
• **Benefícios do INSS**: 45 a 90 dias
• **Passaporte**: 6 a 20 dias úteis

⚠️ Prazos podem variar por região. Consulte sempre a página oficial do serviço.`;
      return response;
    }
    
    if (searchText.includes('taxa') || searchText.includes('custo') || searchText.includes('preço') || searchText.includes('gratuito')) {
      response += `Sobre taxas de serviços públicos:

• **Muitos serviços online são GRATUITOS**
• **Documentos federais**: Valores padronizados nacionalmente
• **Documentos estaduais**: Consulte o portal do seu estado
• **Certidões**: Varia entre R$ 20-50
• **Passaporte**: Taxa atual de R$ 257,25

💡 Consulte sempre o valor atualizado na página oficial antes de pagar.`;
      return response;
    }
    
    // Resposta padrão mais rica
    response += `Não encontrei essa informação específica no FAQ, mas posso ajudar:

**Para "${query}":**

1️⃣ Acesse gov.br e use a busca avançada

2️⃣ Procure na seção do órgão responsável:
   • Documentos → Receita Federal, Cartórios
   • Saúde → Ministério da Saúde, SUS  
   • Trabalho → Ministério do Trabalho
   • Educação → MEC, INEP

3️⃣ **Atendimento especializado:**
   • Central gov.br: 111
   • Receita Federal: 146
   • INSS: 135
   • SUS: 136

4️⃣ Se for serviço estadual/municipal, acesse o portal do seu estado/cidade.

💬 Continue perguntando! Posso ajudar com mais detalhes sobre qualquer serviço específico.`;
    
    return response;
  }
}