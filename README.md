# Site pessoal – Luciano Costa

Site publicado em **https://lucianoccosta.github.io** (GitHub Pages + Jekyll, tema Academic Pages).

Toda vez que você envia (push) uma alteração para o GitHub, o site é reconstruído sozinho
em 1–2 minutos. Você pode acompanhar na aba **Actions** do repositório.

## O que editar para cada coisa

| Quero mudar...                         | Arquivo                                   |
|----------------------------------------|-------------------------------------------|
| Texto da página inicial                | `_pages/about.md`                         |
| Nome, cargo, foto, e-mail, links (barra lateral) | `_config.yml` (seção `author`)  |
| Foto                                   | substitua `images/profile.jpg`            |
| **Publicações**                        | substitua `files/publications.bib`        |
| **CV (PDF)**                           | substitua `files/CV_Luciano_Costa.pdf`    |
| Palestras (aba Talks)                  | `_data/talks.yml`                         |
| Disciplinas e orientações (aba Teaching) | `_data/teaching.yml`                    |
| Abas do menu superior                  | `_data/navigation.yml`                    |

**Mantenha os mesmos nomes de arquivo** (`publications.bib`, `CV_Luciano_Costa.pdf`, `profile.jpg`),
senão o site não os encontra.

### Publicações
A aba *Publications* lê o `files/publications.bib` e monta a lista automaticamente:
separa por tipo (`@article` → Journal Articles, `@inproceedings` → Conference Papers, ...),
ordena por ano (mais recente primeiro), coloca o título com link para o DOI e seu nome em negrito.
Campos usados: `author`, `title`, `journal`/`booktitle`, `volume`, `number`, `pages`, `year`, `doi` ou `url`, `note`.

### Talks e Teaching
São arquivos de texto simples (YAML). Para adicionar algo, copie um bloco existente e edite.
Cuidados: mantenha a indentação (espaços, não TAB) e coloque textos com `:` entre aspas.

## Como atualizar o site

**Pelo navegador (mais fácil):** abra o repositório no GitHub, navegue até o arquivo,
clique no lápis (editar) ou em *Add file → Upload files* para substituir um PDF/.bib,
e clique em *Commit changes*.

**Pelo terminal (WSL):**
```bash
cd ~/workspace/lucianoccosta.github.io
git add -A
git commit -m "Atualiza CV e publicações"
git push
```

## O que não precisa mexer
`_includes/`, `_layouts/`, `_sass/`, `assets/` são o tema (aparência do site).
`assets/js/bib-publications.js` é o script que lê o `.bib`.

A pasta `CV_atual/` fica só no seu computador (está no `.gitignore`) e não vai para o site.
