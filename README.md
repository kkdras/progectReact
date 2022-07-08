# Социальная сеть 
[посмотреть](https://kkdras.github.io/progectReact)

Чтобы войти: 
- login - mojolkozlov73@gmail.com
- password - 86867575 
 
## Немного о реализации
Страница регистрации выполнена в виде stepper. Для сохранения введенных данных используется localstorage. Благодаря этому данные сохраняются между сессиями. При нахождении на определенном шаге номер не отображается в url. Это предусмотрено для того чтобы пользователь не смог попасть сразу на следующий шаг. 

Чат реализован на Websocket. Новые сообщения автоматически подгружаются в начало списка при этом все компоненты сообщений мемоизированны и не вызываются снова. При разрыве соединения происходит повторная попытка подключения. 

На странице поиска пользователей фильтры поиска сохраняются в url, при перезагрузке страницы контент загружается опираясь эти данные. 
	
Весь контент в приложении подгружается динамически. 

## Стек: 
React \
Redux-toolkit \
Typescript \
Material UI \
React-hook-form \
Websocket \
Axios \
React-Router