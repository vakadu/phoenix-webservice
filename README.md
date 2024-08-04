# Pemilyy

## Start the app

To start the development server run `nx serve pemily.com`. Open your browser and navigate to http://localhost:1001/.

For adding types globally, create a types file **.d.ts in types folder, and add the path in the library which you using like api library got tsconfig.json and add it like
"files": [
"../../types/auth.d.ts"
],
in the project level
"include": [
....,
"../../types/**/_.d.ts"
],
add this line "../../types/\*\*/_.d.ts" at the last in tsconfig.json
