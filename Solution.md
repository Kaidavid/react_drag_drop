# Approaches

<ol>
    <li> The given data items are added to the DOM dynamically and therefore, new data can always be added easily.</li>
    <li> The functions are implemented using <strong>Functional Components</strong> over <strong>Class Components</strong> and I used the React Hook <strong>useState</strong> for updating states. <br><br>Eventhough, I frist started the project using Class Components, I shifted to Functional Components due to their higher functional nature, for instance to embed on function on the other.</li>
    <li> Breaking down the code:
        <ul>
            <li>The site is mainly divided in to three parts: the navigation on the top, the data and function blocks on the left, and the remaining boxes</li>
            <li>While drag (onDrag, onDragStart) is implemented on the left blocks, drop (onDrop, onDragEnter, onDragOver) is implemented on the boxes.</li>
            <li>4 useState React Hooks are used to track dropped items, an item being dragged, the border color, and the one I added by myself for catching input values. Whenever these states are updated, React will re-render the component with the updated values.</li><br>For example: <i>const [selected, setSelected] = useState([])</i> tracks selected or items
            <li>The logic is that Not all dragged items are dropped in the correct position and when its correct <i>setBorder</i> runs. If the border is green and item is dropped, <i>setSelected</i> runs</li>
            <li>Boostrap classes and separate css files are used to style the app</li>
            <li>Two additional function for manipulating arrays and objects are implemented</li>
        </ul>
    </li>
    <li>There are 2 react libraries to execute drag and drop.However, learning a new library is not always easy, so I sticked with the basic methods</li>
        <ul>
            <li><i>npm i react-dnd react-dnd-html5-backend</i></li>
            <li><i>npm i react-beautiful-dnd</i></i>
        </ul>
</ol>
<br>

# Difficulties
<ol>
    <li>The conditional rendering which is used to display the items dropped in the box updates both at the same time and therefore, it only shows the current dropped item</li>
    <li>Adding hooks to change the background color and the small closing buttons causes the app to crush. If it weren't for time, it would be better to remove the nested function </li>
</ol>
<br>

# Additions or Changes
<ol>
    <li>The 3 functions are executed automatically, so the button is changed to Reset button</li>
    <li>An input field to add new data</li>
    <li>Carefully desinged small screen view</li>
</ol>