import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto/auth.dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = 
      await Test.createTestingModule({
        imports: [AppModule]
      })
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService)
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(async () => {
    await app.close();
  });

  describe ('Auth', () => {
    const dto: AuthDto = {
      email: 'test@test.fr',
      password: '123'
    };

    describe ('Signup', () => {
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });

      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400);
      })
    });

    describe ('Signin', () => {
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200);
      });

      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400);
      })
    });
  });

  describe ('User', () => {
    describe ('Get me', () => {
      it.todo('should get me');
    });
    describe ('Edit user', () => {
      it.todo('should edit a user');
    });
  });

  describe ('Bookmark', () => {
    describe ('Create bookmark', () => {});
    describe ('Get bookmarks', () => {});
    describe ('Get bookmark by id', () => {});
    describe ('Edit bookmark', () => {});
    describe ('Delete bookmark', () => {});
  });
  
});