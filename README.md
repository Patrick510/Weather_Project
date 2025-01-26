# Como Executar a Aplicação Frontend (Vite + TypeScript)

Este guia irá te orientar no processo de configuração e execução da aplicação frontend desenvolvida com Vite e TypeScript.

---

## Pré-requisitos

Certifique-se de que os seguintes itens estejam instalados no seu ambiente:

1. **Node.js**:

   - Baixe e instale a versão LTS mais recente do [site oficial do Node.js](https://nodejs.org/).
   - Após a instalação, verifique se o Node.js está disponível usando os comandos:
     ```bash
     node -v
     npm -v
     ```
     > Isso exibirá as versões instaladas do Node.js e npm.

2. **Git** (opcional, caso precise clonar o repositório):
   - Baixe e instale o Git pelo [site oficial](https://git-scm.com/).

---

## Passo a Passo

1. **Clone o Repositório (opcional)**
   Caso o projeto esteja em um repositório Git, você pode cloná-lo com o comando:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

   Navegue até o diretório do projeto:

   ```bash
   cd <NOME_DO_DIRETORIO>
   ```

2. **Instale as Dependências**
   Certifique-se de estar no diretório raiz do projeto e execute o comando abaixo para instalar todas as dependências listadas no `package.json`:

   ```bash
   npm install
   ```

3. **Configuração de Ambiente**
   Verifique se há um arquivo `.env.example` no projeto. Caso exista:

   - Renomeie para `.env`:
     ```bash
     cp .env.example .env
     ```
   - Ajuste as variáveis de ambiente conforme necessário.

4. **Inicie o Servidor de Desenvolvimento**
   Para rodar a aplicação localmente, execute o comando:

   ```bash
   npm run dev
   ```

5. **Acesse a Aplicação**
   O terminal exibirá um endereço local, como:
   ```
   Local:   http://localhost:5173/
   ```
   Abra este endereço em seu navegador para acessar a aplicação.

---

## Scripts Úteis

- **Iniciar o servidor de desenvolvimento:**

  ```bash
  npm run dev
  ```

- **Construir o projeto para produção:**

  ```bash
  npm run build
  ```

- **Visualizar a build de produção localmente:**
  ```bash
  npm run preview
  ```

---

## Solução de Problemas

- **Erro "Command not found" para `npm` ou `node`:**

  - Certifique-se de que o Node.js está corretamente instalado e adicionado ao PATH do sistema.

- **Erro ao instalar dependências:**

  - Verifique se o arquivo `package.json` está presente no diretório e se você possui conexão com a internet.

- **Porta em uso:**
  - Caso a porta padrão (5173) esteja em uso, o Vite tentará outra porta automaticamente. Verifique o terminal para o endereço atualizado.

---

Agora você está pronto para executar e explorar sua aplicação!
