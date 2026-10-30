# Como atualizar o site lucianoccosta.github.io

Atualizado em 30/10/2026.

## Visão geral

Para mudar o site, você edita um arquivo no repositório e envia (push) para o GitHub; o site se reconstrói sozinho em 1–2 minutos. Cada aba é controlada por um único arquivo, listado abaixo.

Repositório: [github.com/lucianoccosta/lucianoccosta.github.io](https://github.com/lucianoccosta/lucianoccosta.github.io) · Site: [lucianoccosta.github.io](https://lucianoccosta.github.io)

| O que mudar | Arquivo | Como |
| --- | --- | --- |
| Publicações | `files/publications.bib` | Substituir o arquivo |
| CV | `files/CV_Luciano_Costa.pdf` | Substituir o arquivo |
| Palestras (Talks) | `_data/talks.yml` | Editar texto |
| Disciplinas e orientações (Teaching) | `_data/teaching.yml` | Editar texto |
| Tutoriais (Tutorials) | `_data/tutorials.yml` | Editar texto |
| Texto da página inicial | `_pages/about.md` | Editar texto |
| Nome, cargo, e-mail, links da barra lateral | `_config.yml` (seção `author`) | Editar texto |
| Foto | `images/profile.jpg` | Substituir o arquivo |
| Abas do menu | `_data/navigation.yml` | Editar texto |

Regra de ouro: ao substituir um arquivo, mantenha exatamente o mesmo nome. As pastas `_includes/`, `_layouts/`, `_sass/` e `assets/` são o visual do site e não precisam ser mexidas.

## Como enviar as alterações

Há dois caminhos; o navegador é o mais simples para trocas pequenas (um PDF, um .bib, uma linha).

**Opção A — pelo navegador (github.com)**

1. Abra o repositório no GitHub e entre na pasta do arquivo (ex.: `files`).
2. Para **substituir** um PDF ou .bib: clique em *Add file → Upload files*, arraste o arquivo novo (com o mesmo nome) e clique em *Commit changes*.
3. Para **editar texto**: clique no arquivo, depois no lápis (*Edit this file*), faça a mudança e clique em *Commit changes*.
4. Aguarde 1–2 minutos e recarregue o site.

**Opção B — pelo terminal (WSL), editando no seu computador**

1. Edite ou substitua os arquivos na pasta `~/workspace/lucianoccosta.github.io`.
2. No terminal do Ubuntu (WSL), rode:

```bash
cd ~/workspace/lucianoccosta.github.io
git pull          # traz mudanças feitas pelo navegador, se houver
git add -A
git commit -m "Atualiza CV e publicações"
git push
```

Se usar os dois caminhos, rode sempre `git pull` antes de editar no computador, para não haver conflito. Use o git de dentro do WSL (Ubuntu), não o do Windows.

## Passo a passo por tarefa

### Atualizar publicações

1. Atualize o `publications.bib` no Overleaf (o mesmo do CV).
2. Baixe-o e envie para `files/publications.bib`, substituindo o antigo.

A aba monta a lista sozinha: separa `@article` (Journal Articles), `@inproceedings` (Conference Papers) e `@book`/`@incollection`, ordena por ano e põe seu nome em negrito. O título vira link quando a entrada tem `doi` ou `url`. Um `note = {Forthcoming}` aparece em itálico.

### Atualizar o CV

1. Compile o CV no Overleaf e baixe o PDF.
2. Renomeie para `CV_Luciano_Costa.pdf` e envie para `files/`, substituindo o antigo.

### Adicionar uma palestra (Talks)

Abra `_data/talks.yml`, copie um bloco e cole no topo da lista (a ordem do arquivo é a ordem da página). Campos sem informação podem ser apagados.

```yaml
  - year: 2026
    title: "Título da palestra"
    url: "https://link-do-evento-ou-video"
    event: "Nome do seminário"
    location: "Cidade, País"
    host: "Universidade"
    language: "English"
```

### Adicionar disciplina ou orientação (Teaching)

Em `_data/teaching.yml`, as disciplinas ficam uma por linha em `undergraduate` e `graduate`:

```yaml
  - { years: "2026–", course: "Nome da disciplina" }
```

As orientações ficam em `masters_supervision`, um bloco por aluno:

```yaml
  - years: "2026–"
    student: "Nome do aluno"
    title: "Título da dissertação"
    program: "M.Sc. in Production Engineering at UFPB"
    role: "Advisor"
```

### Adicionar um tutorial (Tutorials)

Em `_data/tutorials.yml`, copie um bloco e edite. O campo `description` é opcional e aparece embaixo do título.

```yaml
- title: "Basic Notions of Julia"
  url: "https://www.youtube.com/playlist?list=..."
  language: "Portuguese"
```

### Mudar cargo, e-mail ou links da barra lateral

Em `_config.yml`, seção `author`, edite `bio` (cargo), `email`, `location` e os links (`googlescholar`, `orcid`, `dblp`, `lattes`...). Deixar um campo vazio esconde aquele link. Altere também `description`, no topo do arquivo, que é o texto mostrado no Google.

### Trocar a foto

Envie a nova foto como `images/profile.jpg` (de preferência quadrada ou vertical).

### Mudar o texto da página inicial

Edite `_pages/about.md`. Mexa só abaixo da segunda linha `---`; parágrafos são separados por uma linha em branco, `**texto**` vira negrito e `[texto](link)` vira link.

### Tirar ou reordenar abas do menu

Em `_data/navigation.yml`, apague ou mova o par de linhas `title`/`url` da aba.

## Cuidados e problemas comuns

Quase todo erro vem de um arquivo `.yml` mal formatado; os cuidados abaixo evitam a maioria.

- **Indentação:** use espaços, nunca TAB, e alinhe o bloco novo com os vizinhos.
- **Aspas:** coloque entre aspas todo texto que tenha `:`, `#` ou comece com `@`, `*` ou `[`.
- **Nomes de arquivo:** iguais aos atuais, inclusive maiúsculas (`CV_Luciano_Costa.pdf`).

| Sintoma | O que fazer |
| --- | --- |
| O site não mudou depois de 2 minutos | Recarregue com Ctrl+F5. Veja a aba *Actions* do repositório: x vermelho = erro de construção; clique nele para ver o arquivo e a linha. |
| Uma aba ficou vazia ou o site saiu do ar | Desfaça a última mudança no `.yml` editado (no GitHub: *History* do arquivo) e confira indentação e aspas. |
| Uma publicação não aparece ou aparece incompleta | Confira se a entrada do `.bib` abre e fecha as chaves `{ }` corretamente e se os campos estão separados por vírgula. |
| Acentos estranhos numa publicação | Prefira escrever o acento direto (`ç`, `ã`) no `.bib`; os comandos LaTeX comuns (`{\'a}`, `{\c{c}}`) também funcionam. |
| O PDF do CV não abre na aba | Alguns celulares não mostram PDF embutido; o botão *Download CV (PDF)* sempre funciona. |
| `git push` recusado | Rode `git pull` e depois `git push` de novo. |
