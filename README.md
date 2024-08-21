
# Teste Front-End 08/2024


O principal objetivo do projeto é criar uma interface intuitiva para pesquisa e modificação de registros em uma base de dados. A aplicação permitirá visualizar, buscar e editar informações detalhadas de produtos, incluindo imagem, nome, preço, marca e categoria. Esse sistema facilitará a gestão e atualização dos dados de forma eficiente e organizada, proporcionando uma experiência de usuário otimizada

## Gerenciador de pacotes
Para você conseguir rodar o projeto é necessário ter o **yarn** instalado em seua maquina, siga este [tutorial](https://chore-update--yarnpkg.netlify.app/pt-BR/docs/install#windows-tab) de instalção para seguir para os próximos passos.

## Node
A versão utilizada para o desenvolvimento deste projeto foi a **v20.16.0**

## Yarn
A versão utilizada para o desenvolvimento deste projeto foi a **1.22.22**
## Executando o Front-end
Para rodar o front-end deve ser acessada a pasta **frontend**.

Dentro da pasta você precisará executar os comandos abaixo

1. yarn install
1. yarn dev

O projeto esta configurado para rodar na porta **3000**

## Executando Back-end
Para rodar o back-end deve ser acessada a pasta **backend**.

Dentro do projeto você precisará do arquivo **.env** com as variáveis citadas abaixo.

* **AWS_ACCESS_KEY_ID**
* **AWS_SECRET_ACCESS_KEY**
* **AWS_REGION**
* **AWS_S3_BUCKET_NAME**
* **MONGO_URI**


Dentro da pasta você precisará executar os comandos abaixo

1. yarn install
1. yarn run start:dev

O projeto esta configurado para rodar na porta **3001**

## Front-end e tecnologias utilizadas

- **Next**: Justificativa: Escolhido por sua capacidade de renderizar páginas no lado do servidor (SSR) e gerar sites estáticos (SSG), proporcionando desempenho e uma navegação fluida.


- **Mantine**: Justificativa: Selecionado para criar uma interface moderna e customizável com componentes pré-construídos que aceleram o desenvolvimento de formulários, tabelas e modais.

    

- **Axios**: Justificativa: Utilizado para facilitar as requisições HTTP à API, simplificando o gerenciamento de chamadas assíncronas e oferecendo boa integração com React Query.


- **React Query**: Justificativa: Empregado para gerenciar o estado de dados assíncronos, garantindo que a interface esteja sempre atualizada e otimizando a experiência do usuário.




## Back-end e tecnologias utilizadas

- **NestJS**: Escolhemos o NestJS por ser um framework eficiente para construir aplicações server-side escaláveis e bem estruturadas. Ele oferece uma arquitetura modular que facilita a manutenção e a integração com outras bibliotecas, além de ser altamente compatível com TypeScript.

- **MongoDB**: Utilizamos o MongoDB por ser um banco de dados NoSQL flexível e escalável, ideal para armazenar e gerenciar os dados dos produtos. Sua estrutura de documentos facilita o trabalho com dados não estruturados e permite consultas rápidas, especialmente em um contexto de pesquisa.

- **AWS S3**: O AWS S3 foi escolhido como solução para o armazenamento de imagens, proporcionando um serviço confiável e seguro. Ele permite o upload e a gestão de imagens de forma escalável, garantindo alta disponibilidade e fácil integração com o restante da aplicação.
