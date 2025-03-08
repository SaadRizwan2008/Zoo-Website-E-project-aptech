// Ticket pricing constants
const PRICES = {
    adult: 2000,
    child: 1000,
    senior: 1500,
    familyPack: 5000,
    guidedTour: 150,
    feedingExperience: 250
};

// Get all the input elements
document.addEventListener('DOMContentLoaded', function() {
    // Get ticket quantity inputs
    const adultTickets = document.getElementById('adultTickets');
    const childTickets = document.getElementById('childTickets');
    const seniorTickets = document.getElementById('seniorTickets');
    const familyPack = document.getElementById('familyPack');
    
    // Get addon checkboxes
    const guidedTour = document.getElementById('guidedTour');
    const feedingExperience = document.getElementById('feedingExperience');
    
    // Elements to update
    const totalElement = document.querySelector('.card-body p.fw-bold');
    const orderSummary = document.querySelector('.card-body div.flex-grow-1');
    
    // Add event listeners to all inputs
    const allInputs = [adultTickets, childTickets, seniorTickets, familyPack, guidedTour, feedingExperience];
    allInputs.forEach(input => {
        input.addEventListener('change', calculateTotal);
    });
    
    // Initial calculation
    calculateTotal();
    
    // Function to calculate the total amount
    function calculateTotal() {
        // Get ticket quantities
        const adultQty = parseInt(adultTickets.value) || 0;
        const childQty = parseInt(childTickets.value) || 0;
        const seniorQty = parseInt(seniorTickets.value) || 0;
        const familyQty = parseInt(familyPack.value) || 0;
        
        // Calculate ticket subtotals
        const adultSubtotal = adultQty * PRICES.adult;
        const childSubtotal = childQty * PRICES.child;
        const seniorSubtotal = seniorQty * PRICES.senior;
        const familySubtotal = familyQty * PRICES.familyPack;
        
        // Calculate add-ons
        const tourCost = guidedTour.checked ? PRICES.guidedTour : 0;
        
        // Calculate feeding experience (per person)
        const totalPeople = adultQty + childQty + seniorQty + (familyQty * 4); // Family pack counts as 4 people
        const feedingCost = feedingExperience.checked ? (totalPeople * PRICES.feedingExperience) : 0;
        
        // Calculate total
        const total = adultSubtotal + childSubtotal + seniorSubtotal + familySubtotal + tourCost + feedingCost;
        
        // Update the total display
        totalElement.textContent = `Total: pkr${total.toFixed(2)}`;
        
        // Update order summary
        let summaryHTML = '';
        
        if (adultQty > 0) {
            summaryHTML += `<p>Adult Tickets (${adultQty}): pkr${adultSubtotal.toFixed(2)}</p>`;
        }
        
        if (childQty > 0) {
            summaryHTML += `<p>Child Tickets (${childQty}): pkr${childSubtotal.toFixed(2)}</p>`;
        }
        
        if (seniorQty > 0) {
            summaryHTML += `<p>Senior Tickets (${seniorQty}): pkr${seniorSubtotal.toFixed(2)}</p>`;
        }
        
        if (familyQty > 0) {
            summaryHTML += `<p>Family Packs (${familyQty}): pkr${familySubtotal.toFixed(2)}</p>`;
        }
        
        if (guidedTour.checked) {
            summaryHTML += `<p>Guided Tour: pkr${tourCost.toFixed(2)}</p>`;
        }
        
        if (feedingExperience.checked && totalPeople > 0) {
            summaryHTML += `<p>Feeding Experience (${totalPeople} people): pkr${feedingCost.toFixed(2)}</p>`;
        }
        
        if (summaryHTML === '') {
            summaryHTML = '<p>Selected tickets will appear here</p>';
        }
        
        summaryHTML += `<p class="fw-bold mt-3">Total: pkr${total.toFixed(2)}</p>`;
        
        // Replace the content
        orderSummary.innerHTML = summaryHTML;
    }
});