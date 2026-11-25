# Hairstyle — Projeto Integrador

Abra a pasta do projeto no VS Code e use **Open with Live Server** em `index.html`. As oito páginas usam HTML, CSS e JavaScript e podem ser testadas sem instalar dependências do projeto.

## Roteiro de teste

1. Na página inicial, clique em **Explorar estilos**. Escolha uma das cinco categorias pelos cards ou pelos filtros.
2. Abra **Cuidados**, selecione um tipo de cabelo e compare as dicas e a rotina semanal. Em **Finalização**, a orientação de uso do leave-in acompanha o tipo escolhido.
3. Acesse **O problema** e **Sobre** pelo menu. No celular, toque em **Menu** para abrir a navegação.
4. Em **Dúvidas**, clique em uma pergunta para ler a resposta. O campo de pergunta livre e os formulários de novidades exibem um aviso sobre a disponibilidade do envio.
5. Em **Entrar**, teste um e-mail inválido. Clique em **Criar conta** e experimente duas senhas diferentes. Depois de corrigir os campos, o site confirma a validação local.

## Integração futura dos formulários

Login e cadastro estão em modo de demonstração. Os formulários usam `method="post"` e preservam os destinos `login.php` e `cadastro.php` para a próxima etapa. Quando os endpoints e a validação do servidor estiverem prontos, retire `data-demo` dos formulários e atualize os avisos de demonstração. Os arquivos PHP e a configuração do banco continuam nas branches de origem.
