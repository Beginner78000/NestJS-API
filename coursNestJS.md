# NestJS

## Module decorator
c'est une fonction qui ajoute des metadatas aux classes qui le compose.

```TS
import { Controller, Get } from '@nestjs/common';

@Controller('cats') // @Controller est le module decorator et 'cats' le chemin pour y accèder
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

## Injection Depedency
Le controller appel le service :
- le controller reçoit une requête du navigateur (POST) qui demande par exemple de logger le user 
- Il va ensuite appeler une fonction du service 
- Puis retourner le résultat au navigateur

Pour cela le controller va devoir instancier une classe du service.

```TS
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {} // same as : `const service = new AuthService();`
}
/* private est un racourcci de :
authService = AuthService;
this.authService = authService */
```

Avec les **injection depedencies** on évite d'avoir à gérer l'emplacement et l'utilisation de l'instance qui va être gérer par Nest directement.