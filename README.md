# React Editor Hybrid Demo

[Демо-версія](https://artemvysotsky.github.io/react-editor-hybrid-demo/) гібридного онлайн WYSIWYG-редактора для React

Стаття про редактор з детальним описом на [DOU](https://dou.ua/forums/topic/)

React Editor Hybrid Demo — це інтерактивний редактор, побудований на React, який дозволяє демонструвати інтеграцію редакторів у веб-додатках.

## Особливості
- Зручне редагування тексту.
- Легка інтеграція з React.
- Розширюваний функціонал.

## Інструкція з використання

1. Клонуйте репозиторій:

   ```bash
   git clone https://github.com/ArtemVysotsky/react-editor-hybrid-demo.git
   ```

2. Перейдіть у папку проєкту:
   ```bash
   cd react-editor-hybrid-demo
   ```

3. Встановіть залежності:
   ```bash
   npm install
   ```

4. Запустіть проєкт:
   ```bash 
   npm start
   ```

## Приклад використання
```jsx

import Editor, { Reducer, actions} from '../../components/Editor.js'
import Main from './Editor/Main.js'

function App() {

    const [post, setPost] = useState({
        title: '', description: ''
    })
    const [state, dispatch] = useReducer(Reducer)

    useEffect(() => {

        (async () => {
            dispatch(
                actions.load(post.blocks ?? [])
            )
            setPost(post)
        })()
    }, [])

    return <article itemScope="itemscope" itemType="https://schema.org/Article">
        <Main title={post.title} image={post.image} onChange={handleChange} />
        <Editor blocks={{ state, dispatch, actions }} intro={post.description}
            onChangeIntro={intro => handleChange('description', intro)} />
    </article>
}
```

## Ліцензія

Цей проєкт поширюється під ліцензією MIT.