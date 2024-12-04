GIT - BITBUCKET
Alterando o codigo e recolando no repositorio 

1 - Criar uma pasta localmente 

2 - Rode o terminal dentro da pasta criada

Se não tiver o Git instalado:

3 - sudo apt update

4 - sudo apt install git  

(Windows/Mac: Baixe e instale o Git em git-scm.com.)

Depois de instalar o Git, configure seu nome de usuário e e-mail globalmente:


5 - git config --global user.name "Seu Nome"

6 - git config --global user.email "seuemail@exemplo.com"

Você pode verificar suas configurações com:

7 - git config --global --list


Criar um Novo Projeto no VSCode

Abra o Visual Studio Code.
Vá em File > Open Folder e escolha ou crie uma nova pasta para o projeto.
No terminal integrado do VSCode, inicialize um repositório Git na pasta:

8 - git init

Isso criará um repositório Git local.

Gerar uma Chave SSH
No terminal, execute o seguinte comando para gerar uma chave SSH:


9 - `ssh-keygen -t rsa -b 4096 -C "seuemail@exemplo.com"`

Ative o agente SSH e adicione sua chave:

10 - `eval "$(ssh-agent -s)"`
11 - `ssh-add ~/.ssh/id_rsa`

Copiar a Chave SSH Pública - Agora, copie a chave pública para adicioná-la ao Bitbucket:

12 - `cat ~/.ssh/id_rsa.pub`   e  Copie o conteúdo que aparecer.

Vá até Bitbucket, faça login, e navegue até Settings (Configurações de conta) no canto superior direito e selecione a 3ª opção "Personal Bitbucket settings".
No menu lateral a esquerda, clique em SSH Keys.
Clique em Add Key, cole sua chave pública e clique em Add Key.
Agora, sua máquina pode se autenticar no Bitbucket usando SSH.

Conectar o Repositorio remoto ao git local


13 - `git remote add origin git@bitbucket.org:catolica_projeto_web_ux/pet-shop-front-end.git`

Isso irá baixar o link remoto para sua maquina 


14 - `git clone git@bitbucket.org:catolica_projeto_web_ux/pet-shop-front-end.git` (Clone o repositorio);

15 - `git branch -a`  - listara tudo que foi baixado;

16 - `git checkout nome_branch` - selecionar a branch criada para seu usuario;

Caso não haver branch direcionada ao seu usuário (isso será comunicado pelo Jairo), então:

16.1 - `git checkout -b nova-branch` - nome da branch, também será direcionada pelo Jairo. 

16.2 - `git push origin nova-branch` -  para criar a nova branch no remoto;

Sempre que entrar na branch o Dev faz um pull:

17 - `git pull` e verifica se há alteração;

Ao alterar qualquer documento dentro da branch:

18 - `git status` para verificar se há alguma alteração na branch selecionada

18.1 - `git add .` O "." indica que será enviado todos os arquivos criados dentro do diretório da branch;

18.2 - `git status` simples conferencias se a adição dos arquivos foram sucedidos;

19 - `git commit -m "mensagem padrão"` -  Jairo irá listar as mensagens padrões;

20 - `git push origin branch_atual` - faz o upload para o Bitbucket.

