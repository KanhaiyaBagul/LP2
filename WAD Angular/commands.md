# General Angular CLI Commands

To create an Angular project from scratch on your own machine, you typically install the Angular CLI globally and use standard `ng` commands. Here is the step-by-step process:

### 1. Install Angular CLI Globally
If you haven't already installed the Angular CLI on your computer, run this command in your terminal. This allows you to use the `ng` command anywhere.
```bash
npm install -g @angular/cli
```

### 2. Create a New Project
This command creates a new Angular application. It will prompt you for settings like routing and stylesheets.
```bash
ng new my-project-name
```
*(If you want to skip prompts, you can add flags: `ng new my-project-name --routing --style=css`)*

### 3. Navigate into the Project
Move into the new folder that was just created:
```bash
cd my-project-name
```

### 4. Generate Components & Services
To add features to your app, you use the `generate` command.
```bash
# Generate a component
ng generate component login

# Shorthand for generating a component
ng g c register

# Generate a service
ng generate service auth

# Shorthand for generating a service
ng g s auth
```

### 5. Run the Project
To start the local development server and view your app in the browser:
```bash
ng serve
```
*(If you want it to automatically open your browser, use `ng serve --open` or `ng serve -o`)*
