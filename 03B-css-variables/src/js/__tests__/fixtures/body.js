export const body = `
<main class="container">
<div class="form-container">
    <form class="form">
        <label for="spacing">Spacing</label>
        <input type="range" name="spacing" id="spacing" value="0" data-unit="px">

        <label for="blur">Blur</label>
        <input type="range" name="blur" id="blur" value="0" data-unit="px">

        <label for="color">Color</label>
        <input type="color" name="color" id="color" value="#000000" data-unit="">
    </form>
</div>

<div class="image-container">
    <img src="https://source.unsplash.com/7bwQXzbF6KE/800x500" alt="woman on a mountain" id="photo">
</div>
</main>
`;
