# Gulp Workflow

- Link to the docs I made on the SLab site for more details, but wanted to cover some stuff about initial setup.

## Prerequisites

- See Gulp docs on SLab site re. Node.js & npm

- Will need to have a `package.json` file, where all of your info on JS libraries lives. The [documentation](https://docs.npmjs.com/getting-started/using-a-package.json) on this process is very good.

## Installation & Writing Gulpfile

- Again, mostly covered in SLab docs

## Task structure

```bash
C:\my-projects\jekyll-boilerplate>gulp --tasks
[17:33:22] Tasks for C:\my-projects\jekyll-boilerplate\gulpfile.js
[17:33:22] ├── js_main_format
[17:33:22] ├── js_lib_format
[17:33:22] ├─┬ js_format
[17:33:22] │ └─┬ <parallel>
[17:33:22] │   ├── js_main_format
[17:33:22] │   └── js_lib_format
[17:33:22] ├── js_main_clean
[17:33:22] ├── js_site_clean
[17:33:22] ├─┬ js_clean
[17:33:22] │ └─┬ <parallel>
[17:33:22] │   ├── js_main_clean
[17:33:22] │   └── js_site_clean
[17:33:22] ├── js_main_watch
[17:33:22] ├─┬ js
[17:33:22] │ └─┬ <series>
[17:33:22] │   ├─┬ js_clean
[17:33:22] │   │ └─┬ <parallel>
[17:33:23] │   │   ├── js_main_clean
[17:33:23] │   │   └── js_site_clean
[17:33:23] │   ├─┬ js_format
[17:33:23] │   │ └─┬ <parallel>
[17:33:23] │   │   ├── js_main_format
[17:33:23] │   │   └── js_lib_format
[17:33:23] │   └── js_main_watch
[17:33:23] ├── css_main_format
[17:33:23] ├── css_lib_format
[17:33:23] ├─┬ css_format
[17:33:23] │ └─┬ <parallel>
[17:33:23] │   ├── css_main_format
[17:33:23] │   └── css_lib_format
[17:33:23] ├── css_main_clean
[17:33:23] ├── css_site_clean
[17:33:23] ├─┬ css_clean
[17:33:23] │ └─┬ <parallel>
[17:33:23] │   ├── css_main_clean
[17:33:23] │   └── css_site_clean
[17:33:23] ├── css_main_watch
[17:33:23] ├─┬ css
[17:33:23] │ └─┬ <series>
[17:33:23] │   ├─┬ css_clean
[17:33:23] │   │ └─┬ <parallel>
[17:33:23] │   │   ├── css_main_clean
[17:33:23] │   │   └── css_site_clean
[17:33:23] │   ├─┬ css_format
[17:33:23] │   │ └─┬ <parallel>
[17:33:23] │   │   ├── css_main_format
[17:33:23] │   │   └── css_lib_format
[17:33:23] │   └── css_main_watch
[17:33:23] ├── img_format
[17:33:23] ├── img_watch
[17:33:23] ├── img_clean
[17:33:23] ├─┬ img
[17:33:23] │ └─┬ <series>
[17:33:23] │   ├── img_clean
[17:33:23] │   ├── img_format
[17:33:23] │   └── img_watch
[17:33:23] └─┬ assets
[17:33:23]   └─┬ <parallel>
[17:33:23]     ├─┬ js
[17:33:23]     │ └─┬ <series>
[17:33:23]     │   ├─┬ js_clean
[17:33:23]     │   │ └─┬ <parallel>
[17:33:23]     │   │   ├── js_main_clean
[17:33:23]     │   │   └── js_site_clean
[17:33:23]     │   ├─┬ js_format
[17:33:23]     │   │ └─┬ <parallel>
[17:33:23]     │   │   ├── js_main_format
[17:33:23]     │   │   └── js_lib_format
[17:33:23]     │   └── js_main_watch
[17:33:23]     ├─┬ css
[17:33:23]     │ └─┬ <series>
[17:33:23]     │   ├─┬ css_clean
[17:33:23]     │   │ └─┬ <parallel>
[17:33:23]     │   │   ├── css_main_clean
[17:33:23]     │   │   └── css_site_clean
[17:33:23]     │   ├─┬ css_format
[17:33:23]     │   │ └─┬ <parallel>
[17:33:23]     │   │   ├── css_main_format
[17:33:23]     │   │   └── css_lib_format
[17:33:23]     │   └── css_main_watch
[17:33:23]     └─┬ img
[17:33:23]       └─┬ <series>
[17:33:23]         ├── img_clean
[17:33:23]         ├── img_format
[17:33:24]         └── img_watch
```