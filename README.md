# Laravel LSP Server

A **Language Server Protocol (LSP)** server for the [Laravel](https://laravel.com) PHP framework, written in **TypeScript**. This server provides intelligent code assistance to improve developer productivity in Laravel projects.

## Features

- 🔁 **Route Completion**: Autocompletion for route names used in `route()`, `redirect()`, and `action()`.
- 🌍 **Translation Keys & Parameters**: Completion and hover support for translation keys (`trans()`, `__()`, `@lang`) with parameter hints.
- 📦 **Eloquent Models**: Autocompletion and type inference for model attributes, relationships, scopes, and magic methods.

## Installation

> [!WARNING]
> This project is under active development and may change frequently.

Clone the repository and install dependencies using **Bun**:

```bash
git clone https://github.com/CommandMaker/laravel-lsp.git
cd laravel-lsp
bun install
```

[Bun](https://bun.sh) is the prefered way to use the server as it's faster than NodeJS and support TypeScript out of the box.

## Neovim Configuration (v0.12+)

To use this server with **Neovim 0.12+**, using the new `vim.lsp.config()` and `vim.lsp.enable()` APIs:

```lua
vim.lsp.config('laravel-lsp', {
    cmd = { 'bun', 'src/server.ts' },
    cmd_cwd = '/path/to/laravel-lsp-server/',
    filetypes = { 'php', 'blade' },
    root_dir = vim.fs.root(0, { '.git', 'artisan', 'composer.json' })
})

vim.lsp.enable('laravel-lsp')
```

> ✅ Replace `/path/to/laravel-lsp-server/` with the actual path on your system.

## Requirements

- [Bun](https://bun.sh) >= 1.0
- [Laravel](https://laravel.com) >= 10.x
- LSP client (e.g. Neovim, VS Code, etc.)

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

## Contributing

Issues, feature suggestions, and pull requests are welcome! Help us build better Laravel developer tools.
