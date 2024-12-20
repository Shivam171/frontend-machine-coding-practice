// This is optional, but it is a good practice to wrap the code in an IIFE to prevent polluting the global scope.
// Off course, you can use the standard way of defining function.

// Coming back to the main code
(function () {
    // DOM elements
    const modal = document.getElementById('modal');
    const openModal = document.getElementById('open-modal');
    const closeModal = document.getElementById('close-modal');

    const dialog = document.getElementById('dialog');
    const openDialog = document.getElementById('open-dialog');
    const closeDialog = document.getElementById('close-dialog');

    const formModal = document.getElementById('form-modal');
    const openFormModal = document.getElementById('open-form-modal');
    const closeFormModal = document.getElementById('close-form-modal');

    // ----------- Modal ------------
    openModal.addEventListener('click', () => {
        modal.showModal(); // showModal() method is used to display the modal.
    });

    closeModal.addEventListener('click', () => {
        modal.close(); // close() method is used to close the modal.
    });

    // ----------- Dialog ------------

    openDialog.addEventListener('click', () => {
        dialog.show(); // show() method is used to display.
    });

    closeDialog.addEventListener('click', () => {
        dialog.close(); // close() method is used to close the dialog.
    });

    // ----------- Form modal ------------

    openFormModal.addEventListener('click', () => {
        formModal.showModal();
    });

    closeFormModal.addEventListener('click', () => {
        formModal.close();
    });

    // Suppose our form modal is open and we click outside of the modal.
    // Nothing happens right. We can close the modal by clicking outside of the modal.
    // But what if we want to click outside of the modal to close the modal.
    // Here is how to do it.

    // We can add an event listener to the modal to listen for the click event.
    formModal.addEventListener('click', (e) => {
        // If the target element is the modal itself, we close the modal.
        if (e.target === formModal) {
            formModal.close();
        }
    });

})()
