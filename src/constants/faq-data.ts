/**
 * FAQ data following clean code principles
 * Centralized and well-structured FAQ items
 */

import { FAQItem } from '../types';

export const FAQ_DATA: readonly FAQItem[] = [
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
  }
  // Additional FAQ items would continue here...
] as const;