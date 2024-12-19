<<<<<<< Updated upstream
## Vazifa: REST Xizmat

## Ta'rif

Keling, Uy Kutubxonasi Xizmatini yaratishga harakat qilamiz! `Users` `Artists`, `Tracks` va `Albums` haqidagi ma'lumotlarni yaratishi, o'qishi, yangilashi, o'chirishi va ularni o'z Uy Kutubxonalariga `Sevimlilar`ga qo'shishi mumkin!

**Ilova yarating, ilova quyidagi resurslar bilan ishlashi kerak:**

- `User` (xususiyatlar bilan):

  ```typescript
  interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
  }
  ```

- `Artist` (xususiyatlar bilan):

  ```typescript
  interface Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
  }
  ```

- `Favorites` (xususiyatlar bilan):

  ```typescript
  interface Favorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
  }
  ```

**Tafsilotlar:**

1. `Users`, `Artists`, `Albums`, `Tracks` va `Favorites` uchun REST endpointlarini alohida router yo'llari bilan yaratish kerak

- `Users` (`/user` yo'lida)

  - `GET /user` - barcha foydalanuvchilarni olish
    - Server `status code` **200** va barcha foydalanuvchilar yozuvlari bilan javob berishi kerak
  - `GET /user/:id` - id bo'yicha bitta foydalanuvchini olish
    - Server `status code` **200** va `id === userId` bo'lgan yozuv bilan javob berishi kerak agar mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `userId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === userId` bo'lgan yozuv mavjud bo'lmasa
  - `POST /user` - foydalanuvchi yaratish (quyidagi DTO dan foydalaniladi)
    `CreateUserDto`

    ```typescript
    interface CreateUserDto {
      login: string;
      password: string;
    }
    ```

    - Server `status code` **201** va yangi yaratilgan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar so'rov `body` si kerakli maydonlarni o'z ichiga olmasa

  - `PUT /user/:id` - foydalanuvchi parolini yangilash
    `UpdatePasswordDto` (xususiyatlar bilan):

    ```typescript
    interface UpdatePasswordDto {
      oldPassword: string; // oldingi parol
      newPassword: string; // yangi parol
    }
    ```

    - Server `status code` **200** va yangilangan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `userId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === userId` bo'lgan yozuv mavjud bo'lmasa
    - Server `status code` **403** va mos xabar bilan javob berishi kerak agar `oldPassword` noto'g'ri bo'lsa

  - `DELETE /user/:id` - foydalanuvchini o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar yozuv topilgan va o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `userId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === userId` bo'lgan yozuv mavjud bo'lmasa

- `Tracks` (`/track` yo'lida)

  - `GET /track` - barcha Tracksni olish
    - Server `status code` **200** va barcha trek yozuvlari bilan javob berishi kerak
  - `GET /track/:id` - id bo'yicha bitta trekni olish
    - Server `status code` **200** va `id === trackId` bo'lgan yozuv bilan javob berishi kerak agar mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `trackId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === trackId` bo'lgan yozuv mavjud bo'lmasa
  - `POST /track` - yangi trek yaratish
    - Server `status code` **201** va yangi yaratilgan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar so'rov `body` si kerakli maydonlarni o'z ichiga olmasa
  - `PUT /track/:id` - trek ma'lumotlarini yangilash
    - Server `status code` **200** va yangilangan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `trackId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === trackId` bo'lgan yozuv mavjud bo'lmasa
  - `DELETE /track/:id` - trekni o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar yozuv topilgan va o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `trackId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === trackId` bo'lgan yozuv mavjud bo'lmasa

- `Artists` (`/artist` yo'lida)
  - `GET /artist` - barcha Artistsni olish
    - Server `status code` **200** va barcha artists yozuvlari bilan javob berishi kerak
  - `GET /artist/:id` - id bo'yicha bitta artistsni olish
    - Server `status code` **200** va `id === artistId` bo'lgan yozuv bilan javob berishi kerak agar mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `artistId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === artistId` bo'lgan yozuv mavjud bo'lmasa
  - `POST /artist` - yangi artists yaratish
    - Server `status code` **201** va yangi yaratilgan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar so'rov `body` si kerakli maydonlarni o'z ichiga olmasa
  - `PUT /artist/:id` - artists ma'lumotlarini yangilash
    - Server `status code` **200** va yangilangan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code

`**400** va mos xabar bilan javob berishi kerak agar`artist`noto'g'ri (uuid emas) bo'lsa
      - Server`status code`**404** va mos xabar bilan javob berishi kerak agar`id === artistId`bo'lgan yozuv mavjud bo'lmasa
    *`DELETE /artist/:id`- artistsni o'chirish
      - Server`status code`**204** bilan javob berishi kerak agar yozuv topilgan va o'chirilgan bo'lsa
      - Server`status code`**400** va mos xabar bilan javob berishi kerak agar`artistId`noto'g'ri (uuid emas) bo'lsa
      - Server`status code`**404** va mos xabar bilan javob berishi kerak agar`id === artistId` bo'lgan yozuv mavjud bo'lmasa

- `Albums` (`/album` yo'lida)

  - `GET /album` - barcha albomlarni olish
    - Server `status code` **200** va barcha albom yozuvlari bilan javob berishi kerak
  - `GET /album/:id` - id bo'yicha bitta albomni olish
    - Server `status code` **200** va `id === albumId` bo'lgan yozuv bilan javob berishi kerak agar mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `albumId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === albumId` bo'lgan yozuv mavjud bo'lmasa
  - `POST /album` - yangi albom yaratish
    - Server `status code` **201** va yangi yaratilgan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar so'rov `body` si kerakli maydonlarni o'z ichiga olmasa
  - `PUT /album/:id` - albom ma'lumotlarini yangilash
    - Server `status code` **200** va yangilangan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `albumId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === albumId` bo'lgan yozuv mavjud bo'lmasa
  - `DELETE /album/:id` - albomni o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar yozuv topilgan va o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `albumId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === albumId` bo'lgan yozuv mavjud bo'lmasa

- `Favorites`

  - `GET /favs` - barcha sevimlilarni olish

    - Server `status code` **200** va barcha sevimli yozuvlar (**ularning id lari emas**) bilan javob berishi kerak, entity turi bo'yicha ajratilgan holda:

    ```typescript
    interface FavoritesResponse {
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    }
    ```

  - `POST /favs/track/:id` - trekni sevimlilarga qo'shish
    - Server `status code` **201** va mos xabar bilan javob berishi kerak agar `id === trackId` bo'lgan trek mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `trackId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **422** va mos xabar bilan javob berishi kerak agar `id === trackId` bo'lgan trek mavjud bo'lmasa
  - `DELETE /favs/track/:id` - trekni sevimlilardan o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar trek sevimlilar ro'yxatida bo'lgan va endi o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `trackId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar mos trek sevimli bo'lmasa
  - `POST /favs/album/:id` - albomni sevimlilarga qo'shish
    - Server `status code` **201** va mos xabar bilan javob berishi kerak agar `id === albumId` bo'lgan albom mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `albumId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **422** va mos xabar bilan javob berishi kerak agar `id === albumId` bo'lgan albom mavjud bo'lmasa
  - `DELETE /favs/album/:id` - albomni sevimlilardan o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar albom sevimlilar ro'yxatida bo'lgan va endi o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `albumId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar mos albom sevimli bo'lmasa
  - `POST /favs/artist/:id` - artistsni sevimlilarga qo'shish
    - Server `status code` **201** va mos xabar bilan javob berishi kerak agar `id === artistId` bo'lgan artists mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `artistId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **422** va mos xabar bilan javob berishi kerak agar `id === artistId` bo'lgan artists mavjud bo'lmasa
  - `DELETE /favs/artist/:id` - artistsni sevimlilardan o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar artists sevimlilar ro'yxatida bo'lgan va endi o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `artistId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar mos artists sevimli bo'lmasa

2. Hozircha, bu endpointlar faqat **memory** (_hardcoded_) ma'lumotlari bilan ishlashi kerak, keyingi vazifalarda biz DB dan foydalanamiz. Ma'lumot manbai yaqin orada o'zgarishini hisobga olgan holda modullarni tashkil qilishingiz kerak.

3. So'rov va javob tanasi uchun `application/json` formatidan foydalanish kerak.

4. Hammasini bitta faylga joylashtirmang - dastur yaratish (bootstrapping), controllerlar (routerlar) va biznes logikasiga tegishli kod uchun alohida fayldan foydalaning. Shuningdek, fayllarni domen (foydalanuvchi bilan bog'liq, artists bilan bog'liq va hokazo) bo'yicha turli modullarga ajrating.

5. Server javobidan `Foydalanuvchi`ning paroli chiqarib tashlanishi kerak.

6. `artists`, `Albom` yoki `Trek` ni o'chirganingizda, ularning `id` si sevimlilardan (agar u yerda bo'lsa) o'chirilishi kerak va boshqa entity lardagi havolalar `null` ga aylanadi. Masalan: `artists` o'chiriladi => bu `artistId` mos `Albom`lar va `Trek`larda `null`ga aylanadi + bu artistsning `id` si sevimlilardan o'chiriladi, xuddi shu mantiq `Albom` va `Trek` uchun ham amal qiladi.

7. Mavjud bo'lmagan entity `Sevimlilar`ga qo'shilmasligi kerak.

8. Xizmatni ishga tushirish uchun `npm start` buyrug'idan foydalanish kerak.

9. Xizmat `4000` portda tinglashi kerak, PORT qiymati `.env` faylida saqlanadi.

10. Kelayotgan so'rovlar tekshirilishi kerak.

---

**Eslatma:** Har bir vazifani alohida sinab ko‘ring. Kod yozayotganda TypeScript, NestJS standartlarini saqlang. `npm run start:dev` bilan ilovani ishga tushirib natijani tekshiring. Agar tushunmovchilik bo‘lsa, NestJS rasmiy dokumentatsiyasiga murojaat qiling.

---

### 1 - Oddiy Service va Controller yaratish

**Maqsad:** Provider (Service) va Controller o‘rtasidagi bog‘liqlikni tushunish, DI (Dependency Injection) konsepsiyasini amalda ko‘rish.

**Vazifa:**

1. `UsersService` yarating:

   - `src/users/users.service.ts` faylini yarating.
   - `@Injectable()` decorator bilan belgilangan `UsersService` classini yozing.
   - `getUsers()` degan method yozing, massiv ko‘rinishida, masalan: `[{id:1,name:'John'},{id:2,name:'Jane'}]` qaytarsin.

2. `UsersController` yarating:

   - `src/users/users.controller.ts` faylini yarating.
   - `@Controller('users')` bilan belgilang.
   - Controller konstruktorida `private readonly usersService: UsersService` ni inject qiling.
   - `@Get()` handler yarating va unda `return this.usersService.getUsers()` qiling.

3. `UsersModule` yarating:

   - `src/users/users.module.ts` faylini yarating.
   - `@Module({controllers:[UsersController], providers:[UsersService]})` deb yozing.

4. `AppModule`da `UsersModule`ni import qiling:

   - `app.module.ts` da `imports:[UsersModule]` qiling.

5. Ilovani ishga tushiring:
   - `npm run start:dev`
   - Brauzerda `http://localhost:3000/users` ga kiring, massivni ko‘rishingiz kerak.

---

### 2 - Custom Providers va Optional Dependency

**Maqsad:** NestJS da qattiq class bo‘lmagan providerlarni (masalan `useValue`) va optional dependency ni ishlatish.

**Vazifa:**

1. `AppModule` da `'API_KEY'` nomli provider qo‘shing:

   ```typescript
   {
     provide: 'API_KEY',
     useValue: '12345'
   }
   ```

   `providers` array ichiga qo‘shing.

2. `UsersService` da constructor ga `@Inject('API_KEY') private apiKey: string` qo‘shing.

   - `getUsers()` ichida `console.log('API Key:', this.apiKey)` deb yozing.

3. `DB_CONNECTION` degan provider yarating, masalan `AppModule` da:

   ```typescript
   {
     provide: 'DB_CONNECTION',
     useValue: null
   }
   ```

   Keyin bu providerni comment qilib qo‘ying (yoki umuman olib tashlang). Endi `UsersService` konstruktorida:

   ```typescript
   constructor(
     @Inject('API_KEY') private apiKey: string,
     @Optional() @Inject('DB_CONNECTION') private db?: any
   ) {}
   ```

   `getUsers()` methodida agar `db` mavjud bo‘lsa “DB connected” agar yo‘q bo‘lsa “No DB” deb console.log qiling.

4. Ilovani ishga tushirib `/users` ga so‘rov qiling va konsolga qarang. `API Key:` va `No DB` yoki `DB connected` xabarlari chiqishini ko‘ring.

---

### 3 - Property-Based Injection

**Maqsad:** Constructor injectiondan tashqari property injectionni tushunish.

**Vazifa:**

1. `LoggerService` yarating (`logger.service.ts`):

   - `@Injectable()` class.
   - `log(message:string)` methodi `console.log('LOG:', message)` deb yozsin.

2. `UsersService` da constructor injection o‘rniga property injection qiling:

   ```typescript
   @Injectable()
   export class UsersService {
     @Inject(LoggerService)
     private logger: LoggerService;

     getUsers() {
       this.logger.log('Fetching users...');
       return [{ id: 1, name: 'John' }];
     }
   }
   ```

3. Ilovani ishga tushiring. `/users` chaqirganda console da `LOG: Fetching users...` chiqsin.

---

### 4 - Provider Scope (Request Scoped)

**Maqsad:** Request scope tushunchasini amalda ko‘rish.

**Vazifa:**

1. `RequestLoggerService` yarating:

   ```typescript
   @Injectable({ scope: Scope.REQUEST })
   export class RequestLoggerService {
     constructor() {
       console.log('New RequestLoggerService instance created');
     }
   }
   ```

2. `UsersController` konstruktoriga `RequestLoggerService` inject qiling.
   - Har safar `/users` ga so‘rov yuborilganda `New RequestLoggerService instance created` chiqadi.
   - Brauzerdan bir necha marta so‘rov yuboring, har safar yangi instance yaratilishini kuzating.

---

### 5 - Feature Module, Shared Module, Module Re-Exporting

**Maqsad:** Modules arxitekturasini o‘rganish.

**Vazifa:**

1. `CommonModule` yarating (`common.module.ts`):

   - `LoggerService` ni `providers` va `exports` ga qo‘shing.

2. `UsersModule` da `CommonModule` ni `imports` qiling.

   - `UsersService` da `LoggerService` dan foydalaning.

3. `UsersModule` `LoggerService` ni `exports` ham qilsin.

4. `AppModule` faqat `UsersModule` ni import qilsin, lekin `AppModule` ichida ham `LoggerService` ni inject qilib ishlating. Bu re-export tufayli mumkin bo‘ladi.

---

### 6 - Global Module

**Maqsad:** Global modul bilan ishlash.

**Vazifa:**

1. `GlobalConfigModule` yarating va `@Global()` deb belgilang.

2. `ConfigService` yarating, `get(key:string):string` methodi fake config qaytarsin.

3. `GlobalConfigModule` da `ConfigService` ni `providers` va `exports` ga qo‘shing.

4. `AppModule` da `GlobalConfigModule` ni import qiling. Endi `ConfigService` har joyda inject qilinadi.

5. `UsersService` da `ConfigService` ni inject qiling va `get('DB_HOST')` ni console.log qiling.
   - Hech qaysi module da `ConfigService` ni alohida import qilish shart emas.

---

### 7 - Dynamic Module

**Maqsad:** Modullarni runtime da konfiguratsiya qilish.

**Vazifa:**

1. `DatabaseModule` yarating:

   - `forRoot()` static method yarating, `{ uri: string }` param qabul qilsin.
   - `forRoot()` ichida `DB_CONNECTION` provider yarating (`useValue: {uri: options.uri}`).
   - `DynamicModule` qaytaring.

2. `AppModule` da `DatabaseModule.forRoot({uri:'mongodb://localhost/mydb'})` qilin.

3. `UsersService` da `DB_CONNECTION` ni inject qiling va `db.uri` ni console.log qiling.

---

### 8 (Ixtiyoriy qo‘shimcha) - forwardRef

**Maqsad:** Circular dependency ni hal qilishni ko‘rish.

**Vazifa:**

1. `AuthModule` va `UsersModule` yarating.
2. `AuthService` `UsersService` ga bog‘liq bo‘lsin. `UsersService` `AuthService` ga bog‘liq bo‘lsin.
3. Bu circular dependency hosil qiladi.
4. `AuthModule` da `imports: [forwardRef(() => UsersModule)]` yoki `UsersModule` da `imports: [forwardRef(() => AuthModule)]` deb hal qiling.
5. Kodni ishga tushirib, error bo‘lmasligini tekshiring.

---
=======
Mana, TypeScript asoslari bo'yicha turli mavzularda 10 ta task (vazifa):

### 1. **Array (Massiv)**

-   **Task**: TypeScriptda massiv yaratib, undagi elementlarning turini aniqlang. Misol: faqat `string` va `number` turidagi elementlardan iborat massiv yaratib, undan foydalaning.
-   **Misol**:

### 2. **Tuple (Kuple)**

-   **Task**: Tupledan foydalanib, bir nechta turdagi ma'lumotlarni o'z ichiga olgan o'zgaruvchilar yaratib chiqing. Misol uchun: ism, yosh va tug'ilgan sana.
-   **Misol**:

### 3. **Type Aliases (Tur nomi aliaslari)**

-   **Task**: `type` yordamida yangi tur yaratib, uni bir nechta joyda ishlatishga misol keltiring. Misol: biror shaxsning malumotlari (ism, yosh, manzil).
-   **Misol**:

### 4. **Union Type (Ittifoq turi)**

-   **Task**: Union turidan foydalanib, bir o'zgaruvchiga bir nechta turdagi qiymatlarni qabul qilishini ta'minlang. Masalan, o'zgaruvchi raqam yoki matn bo'lishi mumkin.
-   **Misol**:

### 5. **Function (Funktsiya)**

-   **Task**: TypeScriptda funksiya yaratib, uning parametr va qaytish turini aniqlang. Misol: ikkita raqamni qo'shadigan funksiya.
-   **Misol**:

### 6. **Literal Type (Literal tur)**

-   **Task**: Literal turidan foydalanib, faqat muayyan qiymatlarni qabul qiladigan o'zgaruvchi yaratish.
-   **Misol**:

### 7. **Object Type (Obyekt turi)**

-   **Task**: Object turidan foydalanib, ma'lum bir tuzilishga ega obyekt yaratib, uning xususiyatlarini aniqlang.
-   **Misol**:

### 8. **Optional Properties (Ixtiyoriy xususiyatlar)**

-   **Task**: Ixtiyoriy xususiyatlarni aniqlang va obyekt yaratishda ba'zi xususiyatlarni o'tkazib yuboring.
-   **Misol**:

### 9. **Readonly (Faoliyatni o'zgartirish mumkin bo'lmagan xususiyatlar)**

-   **Task**: `readonly` modifier yordamida faqat o'qiladigan (o'zgartirilmaydigan) xususiyatlarga ega obyekt yaratish.
-   **Misol**:

### 10. **Type Assertions (Turga oid aniqlashlar)**

-   **Task**: Type assertion yordamida TypeScriptga ma'lum bir turga ega bo'lgan o'zgaruvchini ko'rsatish.
-   **Misol**:
>>>>>>> Stashed changes
