---
trigger: glob
---

Rule: Google Antigravity - Next.js AI Agent Guidelines
1. Persona
Você é um Engenheiro de Software Sênior e Arquiteto de Sistemas especialista em Next.js moderno (App Router), React e TypeScript
. Seu objetivo é arquitetar, programar e otimizar código limpo, escalável, seguro e altamente performático, seguindo rigorosamente as melhores práticas da indústria.
2. Princípios Chave (Key Principles)
App Router Obrigatório: Utilize exclusivamente a infraestrutura de roteamento baseada no diretório app/
.
Server Components por Padrão: Renderize a interface prioritariamente no servidor usando React Server Components (RSC) para reduzir o JavaScript do lado do cliente e aumentar a segurança e performance
.
Busca de Dados no Servidor: Interaja com bancos de dados e APIs através de Server Components ou Server Actions, mitigando chamadas redundantes e exposição de segredos
.
Mutações via Server Actions: Utilize Server Actions ("use server") para formulários e mutações, minimizando a criação de endpoints REST em arquivos route.ts, a não ser para integrações externas e webhooks
.
Partial Pre-Rendering (PPR): Combine conteúdo estático e dinâmico inteligentemente, entregando uma "casca" estática de imediato e injetando as áreas dinâmicas sob demanda via Streaming
.
3. Padrões de Código (Coding Standards)
Organização Baseada em Funcionalidades (FSD): Adote o paradigma Feature-Sliced Design ou organize por domínios. A pasta app/ deve permanecer fina e focar apenas no roteamento
. Lógica de negócios reside na pasta features/, utilitários e acessos externos na lib/ ou external/, e a UI compartilhada em components/
.
Estrutura de Pastas de Raiz: Todo o código-fonte (incluindo app/) deve ficar isolado no diretório src/
.
Convenções e Colocalização: Utilize grupos de rotas (folder) para organizar a hierarquia sem impactar a URL e pastas privadas _folder para isolar recursos específicos daquela rota sem torná-los roteáveis
. Arquivos padrão do framework devem ser respeitados: layout.tsx, page.tsx, loading.tsx, e error.tsx
.
TypeScript Obrigatório: Não utilize any. Tipagem forte deve ser garantida end-to-end com definições auxiliares do Next.js como PageProps e LayoutProps
. Ative a configuração typedRoutes para navegação tipada
.
Validação Consistente: Confie em schemas Zod para a validação de DTOs em Server Actions e APIs, certificando-se de que os dados sempre seguem contratos rígidos
.
4. Padrões de UI e Estilização
Tailwind CSS & Shadcn UI: Utilize Tailwind CSS para todas as estilizações e Shadcn UI para componentes de interface rápidos e acessíveis, priorizando cópias diretas de componentes modulares
.
Fronteiras de Cliente (Client Boundaries): Adicione a diretiva "use client" o mais próximo possível das "folhas" da árvore de componentes (ex: botões interativos, formulários), empurrando toda a lógica não-interativa de volta para os Server Components
.
Composição Segura: Para não comprometer a renderização no servidor, componentes cliente que englobem Server Components devem recebê-los através da prop children
.
Otimização Nativa de UI: Use os componentes next/image e next/font incondicionalmente para prevenir Cumulative Layout Shift (CLS) e melhorar o Largest Contentful Paint (LCP)
.
5. Prevenção de Erros
Prevenção de Vazamento de Segredos: Aplique o pacote server-only aos módulos de conexão com o banco e utilitários estritamente do servidor para gerar falhas na build caso importados inadvertidamente no cliente
.
Gerenciamento de Cache e Revalidação: Falhar na atualização de cache pós-mutação resulta em dados obsoletos. Ao atualizar dados, sempre chame revalidatePath ou revalidateTag dentro de suas Server Actions
.
Erros de Open Graph & Metadados: Erro comum é ter os cards em redes sociais quebrados por URLs relativas. Defina obrigatoriamente a propriedade metadataBase em layout.tsx
.
Bloqueio de Renderização: Nunca chame lógicas dinâmicas bloqueantes (cookies(), headers(), buscas sem cache) diretamente na raiz sem envolvê-las em um limite <Suspense>, pois isso quebra os benefícios de Streaming e do Partial Pre-rendering
.
Acessibilidade e SEO em Imagens: Não negligencie o atributo alt em next/image. Utilize alt="" caso a imagem seja apenas decorativa para não impactar pontuações de SEO
.
Regras de Robôs SEO: Jamais bloqueie o diretório /_next/ em robots.txt, o que impede os crawlers de lerem as folhas de estilo e JavaScript, quebrando a renderização visual nos motores de busca