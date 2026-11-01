# Perry Mobile (Expo)

Мобильное приложение Perry — iOS, Android и web — на **Expo 57 / React Native 0.86 / TypeScript**.
Данные берёт из **Perry.Api** (Product API) и **Azure Auth Service** (вход/регистрация).

> Полная версия проекта (frontend + backend + mobile) живёт в приватных репозиториях команды.
> Здесь — только мобильное приложение и всё, что нужно, чтобы оно работало.

---

## 1. Что понадобится

| Инструмент | Версия | Зачем |
|---|---|---|
| Node.js | 20 LTS или новее | сборка приложения |
| npm | идёт с Node | зависимости |
| .NET SDK | 8.0 | Product API |
| Docker Desktop | любая актуальная | PostgreSQL для API |
| Expo Go | из App Store / Google Play | запуск на телефоне без сборки |

Проверить, что стоит:

```bash
node -v      # v20.x или выше
dotnet --version   # 8.x
docker info        # без ошибок = Docker Desktop запущен
```

---

## 2. Шаг 1 — поднять бэкенд (Product API)

Приложение без API показывает спиннер и красную плашку `product proxy error`. Сначала API.

```bash
git clone https://github.com/ITSTEP-PERRY/Back_end_for_our_poroject.git
cd Back_end_for_our_poroject
```

### Windows — одной командой

```bat
start-api.cmd
```

Скрипт сам: поднимет PostgreSQL в Docker, создаст `.env` из `.env.example`, дождётся базы и запустит API.

### Вручную (любая ОС)

```bash
cp .env.example .env
docker compose -f docker-compose.dev.yml up -d postgres
dotnet run --project src/Perry.Api --launch-profile http
```

### Проверка

| Что | Адрес |
|---|---|
| Health | http://localhost:5272/api/health |
| Swagger (все эндпоинты) | http://localhost:5272/swagger |
| Товары | http://localhost:5272/api/products?pageSize=1 → `"total": 207` |

База создаётся и наполняется **автоматически** при первом старте: миграции EF + сид
(207 товаров, 5 категорий, отзывы). Ничего вручную заливать не нужно.

Вход и регистрация идут не в локальную базу, а в **Azure Auth Service** — для них нужен интернет.
Каталог, карточка товара и корзина работают полностью локально.

### Если проверяете на телефоне

Профиль `http` слушает только `localhost`, телефон по Wi-Fi его не увидит. Запускайте так:

```bash
dotnet run --project src/Perry.Api --urls http://0.0.0.0:5272
```

---

## 3. Шаг 2 — запустить приложение

```bash
git clone https://github.com/ITSTEP-PERRY/perry-mobile.git
cd perry-mobile
npm install
cp .env.example .env      # Windows: copy .env.example .env
npx expo start
```

Windows-пользователям проще: двойной клик по `start-mobile.cmd` — он сам поставит зависимости,
создаст `.env` и предупредит, если API на `:5272` не поднят.

Дальше — по вкусу:

| Режим | Команда | Что нужно в `.env` |
|---|---|---|
| **Web** (быстрее всего) | `npx expo start --web` → http://localhost:8081 | ничего, запросы идут через Metro-прокси `/api` → `localhost:5272` |
| **Телефон** (Expo Go) | `npx expo start`, сканировать QR | `EXPO_PUBLIC_PRODUCT_URL=http://<LAN-IP-ПК>:5272` |
| **Android-эмулятор** | `npx expo start`, нажать `a` | `EXPO_PUBLIC_PRODUCT_URL=http://10.0.2.2:5272` |

Свой LAN IP: `ipconfig` → «IPv4-адрес» (например `192.168.0.105`). Телефон и ПК — в одной сети.
Первый запуск на телефоне: разрешить приложению доступ в брандмауэре Windows, если спросит.

---

## 4. Переменные `.env`

| Переменная | По умолчанию | Смысл |
|---|---|---|
| `EXPO_PUBLIC_PRODUCT_URL` | `http://localhost:5272` | адрес Product API. На телефоне — LAN IP ПК |
| `EXPO_PUBLIC_AUTH_URL` | Azure Auth Service | вход/регистрация/восстановление пароля |
| `EXPO_PUBLIC_APP_ENV` | `development` | метка окружения |
| `EXPO_PUBLIC_PRODUCT_PROXY_TARGET` | `http://localhost:5272` | цель Metro-прокси `/api` (web) |
| `EXPO_PUBLIC_AUTH_PROXY_TARGET` | Azure Auth Service | цель Metro-прокси `/auth-api` (web) |

`.env` в git не попадает (там бывают личные IP и секреты) — только `.env.example`.

---

## 5. Как понять, что всё связалось

1. `curl http://localhost:5272/api/health` → 200
2. `curl "http://localhost:8081/api/products?pageSize=1"` → JSON, `"total": 207` (это уже через прокси приложения)
3. На главной экран показывает категории и блок **Trending deals** с товарами, красной плашки сверху нет.

Если пункт 2 даёт `502 Bad Gateway` — API не запущен либо упал, смотрите окно `dotnet run`.

---

## 6. Если что-то не работает

| Симптом | Причина | Что делать |
|---|---|---|
| Плашка `product proxy error` | API не запущен | поднять бэкенд, проверить `/api/health` |
| `Product unreachable` / `Network error` на телефоне | в `.env` `localhost`, либо API слушает только localhost | указать LAN IP + запустить API с `--urls http://0.0.0.0:5272` |
| Телефон не открывает QR | ПК и телефон в разных сетях / VPN | одна Wi-Fi сеть, VPN выключить |
| `Port 8081 is already in use` | уже запущен другой Metro | `npx expo start --port 8082` |
| `cannot connect to the Docker daemon` | Docker Desktop не запущен | запустить и дождаться «Engine running» |
| `perry-postgres` не поднимается | остался старый контейнер | `docker rm -f perry-postgres`, повторить |
| Вход не работает | Auth Service в Azure, нужен интернет | проверить `EXPO_PUBLIC_AUTH_URL` |
| Картинки товаров пустые | не отдаётся `/uploads` | проверить `http://localhost:5272/uploads/<файл>` |

---

## 7. Структура

```text
App.tsx
index.ts
src/
  api/          client, token, media, productOrigin, types, эндпоинты
  auth/         AuthContext (JWT + SecureStore)
  cart/         CartContext (гостевая сессия, merge после входа)
  components/   Header, ProductCard, MenuDrawer, FiltersSheet, PrimaryButton…
  navigation/   RootNavigator (stack + tabs + deep links perry://)
  screens/      Home, Products, Product, Cart, Checkout, Orders, Account,
                Login, Register, ForgotPassword, SendCode, Legal…
  data/         локали городов для чекаута
  theme/        цвета и отступы Perry
  utils/
```

Экраны: Home · Catalog · Product (PDP) · Cart · Checkout · Order details · Orders ·
Account · Settings · Wishlist · Reviews · Login · Register · Forgot password ·
Send code · Terms · Privacy · License · Contact · FAQ · Menu.

---

## 8. Сборка APK / AAB (EAS)

```bash
npx eas-cli@latest login
npx eas-cli@latest init            # один раз — привязка projectId на expo.dev
npx eas-cli@latest build -p android --profile preview    # APK для теста
npx eas-cli@latest build -p android --profile production # AAB для Google Play
```

Профили в `eas.json`: `development` / `preview` (APK) / `production` (AAB).
Deep link: `perry://product/{id}`. Иконки и splash — `app.json` + `assets/`.

> В собранном APK `localhost` не работает: адрес API задаётся в `.env` перед сборкой
> или через EAS secrets (`EXPO_PUBLIC_PRODUCT_URL`).

---

## 9. Проверки перед коммитом

```bash
npx tsc --noEmit     # типы
npx expo-doctor      # зависимости и конфиг (должно быть 21/21)
npx expo export --platform web --output-dir .tmp/export   # сборка бандла
```
