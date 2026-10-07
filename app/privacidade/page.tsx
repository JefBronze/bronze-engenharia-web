import type { Metadata } from 'next'
import Link from 'next/link'
import Brand from '../Brand'
import styles from '../landing.module.css'

export const metadata: Metadata = {
  title: 'Política de privacidade — Bronze Engenharia de Energia',
  description:
    'Como a Bronze Engenharia de Energia trata os dados pessoais e as faturas de energia enviadas para o diagnóstico, conforme a LGPD.',
  alternates: { canonical: 'https://www.bronze-engenharia.com.br/privacidade' },
}

const UPDATED = '27 de setembro de 2026'
const EMAIL = 'contato@bronze-engenharia.com.br'

export default function PrivacyPage() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <Link href="/" className={styles.brandLink} aria-label="Bronze Engenharia de Energia — página inicial">
            <Brand />
          </Link>
          <Link href="/" className={styles.headerLink}>← Voltar</Link>
        </div>
      </header>

      <main className={`${styles.container} ${styles.legal}`}>
        <h1 className={styles.legalTitle}>Política de privacidade</h1>
        <p className={styles.legalMeta}>Última atualização: {UPDATED}</p>

        <p>
          Esta política explica como a Bronze Engenharia de Energia trata os dados pessoais e as faturas de energia que você nos envia,
          em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, LGPD).
        </p>

        <h2>1. Quem é o controlador</h2>
        <p>
          Bronze Engenharia de Energia, CNPJ 19.824.419/0001-96, Curitiba/PR.
          Encarregado pelo tratamento de dados (DPO): Jeferson Bronze, pelo e-mail{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>

        <h2>2. Quais dados tratamos</h2>
        <ul>
          <li>
            <strong>Dados de contato</strong> que você fornece ao falar conosco por WhatsApp ou e-mail: nome, telefone,
            e-mail, empresa e cargo.
          </li>
          <li>
            <strong>Faturas de energia</strong> e, se você autorizar, dados do portal da distribuidora. Contêm razão
            social, CNPJ, endereço e número da unidade consumidora, histórico de consumo e demanda, tarifas e valores
            cobrados.
          </li>
          <li>
            <strong>Dados de navegação agregados</strong>, coletados pela Vercel Analytics e Speed Insights sem cookies
            e sem identificar o visitante (páginas vistas, país, tipo de dispositivo, desempenho).
          </li>
        </ul>
        <p>Não pedimos dados sensíveis nem dados de pessoas físicas além dos contatos do responsável pela empresa.</p>

        <h2>3. Para que usamos e com qual base legal</h2>
        <ul>
          <li>
            Elaborar o diagnóstico e o relatório técnico que você pediu: procedimentos preliminares a um contrato, a seu
            pedido (art. 7º, V).
          </li>
          <li>Responder às suas mensagens e acompanhar o diagnóstico: legítimo interesse (art. 7º, IX).</li>
          <li>
            Prestar o serviço contratado depois do piloto, como monitoramento das faturas: execução de contrato (art. 7º, V).
          </li>
          <li>Cumprir obrigações legais, fiscais e profissionais (CREA/ART): obrigação legal (art. 7º, II).</li>
          <li>
            Divulgar o caso do diagnóstico-piloto de forma anonimizada: somente com a sua autorização, e sem nenhuma
            informação que identifique a empresa, as unidades ou as pessoas envolvidas.
          </li>
        </ul>
        <p>Não vendemos, alugamos nem cedemos seus dados. Não usamos suas faturas para oferecer produtos de terceiros.</p>

        <h2>4. Com quem os dados podem ser compartilhados</h2>
        <p>Apenas com fornecedores necessários para operar o serviço, que atuam como operadores:</p>
        <ul>
          <li>Google (Gmail e armazenamento de arquivos) e ImprovMX (encaminhamento de e-mail);</li>
          <li>WhatsApp (Meta), quando você escolhe esse canal;</li>
          <li>Vercel, que hospeda este site.</li>
        </ul>
        <p>
          Também podemos compartilhar dados quando exigido por lei ou por ordem de autoridade competente. A distribuidora
          só recebe informações se você decidir encaminhar um pedido a ela.
        </p>

        <h2>5. Transferência internacional</h2>
        <p>
          Alguns desses fornecedores mantêm servidores fora do Brasil, e parte da equipe técnica trabalha no Canadá. Nesses
          casos a transferência segue o art. 33 da LGPD, com fornecedores que adotam cláusulas contratuais e medidas de
          segurança compatíveis.
        </p>

        <h2>6. Por quanto tempo guardamos</h2>
        <ul>
          <li>
            Faturas e dados do diagnóstico-piloto: se não houver continuidade, são excluídos em até 30 dias após a
            entrega do relatório, ou antes, se você pedir.
          </li>
          <li>Com contrato ativo: durante a vigência e pelo prazo exigido para obrigações legais e profissionais.</li>
          <li>Mensagens de contato: até 12 meses após a última interação.</li>
        </ul>

        <h2>7. Segurança</h2>
        <p>
          O acesso às faturas é restrito a quem executa a análise. Usamos contas com autenticação em dois fatores,
          armazenamento criptografado e conexões seguras (HTTPS). Nenhum sistema é totalmente imune, e se ocorrer um
          incidente relevante avisaremos você e a ANPD conforme a lei.
        </p>

        <h2>8. Seus direitos</h2>
        <p>
          Você pode pedir a qualquer momento: confirmação de que tratamos seus dados, acesso, correção, anonimização,
          portabilidade, exclusão, informação sobre compartilhamentos e revogação de autorizações (art. 18). Basta
          escrever para <a href={`mailto:${EMAIL}`}>{EMAIL}</a>; respondemos em até 15 dias. Você também pode
          reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
        </p>

        <h2>9. Cookies</h2>
        <p>
          Este site não usa cookies de publicidade nem de rastreamento. As métricas de audiência são coletadas sem cookies
          e de forma agregada.
        </p>

        <h2>10. Alterações</h2>
        <p>
          Podemos atualizar esta política. A data da última versão fica no topo desta página, e mudanças relevantes serão
          comunicadas a quem estiver com diagnóstico ou contrato em andamento.
        </p>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <span>Bronze Engenharia de Energia · CNPJ 19.824.419/0001-96 · Curitiba/PR</span>
          <a href={`mailto:${EMAIL}`} className={styles.footerMail}>{EMAIL}</a>
        </div>
      </footer>
    </div>
  )
}
