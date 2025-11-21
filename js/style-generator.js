document.addEventListener('DOMContentLoaded', function() {
    // Only run this code on the style generator page
    if (!document.querySelector('.style-generator')) return;

    // DOM Elements
    const previewImage = document.getElementById('previewImage');
    const viewButtons = document.querySelectorAll('.view-btn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const options = document.querySelectorAll('.option');
    const styleSummary = document.getElementById('styleSummary');
    const saveStyleBtn = document.getElementById('saveStyleBtn');
    const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
    const downloadStyleBtn = document.getElementById('downloadStyleBtn');
    const shareStyleBtn = document.getElementById('shareStyleBtn');
    const printStyleBtn = document.getElementById('printStyleBtn');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const styleCode = document.getElementById('styleCode');
    const saveShareSection = document.getElementById('saveShareSection');
    
    // Current style state
    const currentStyle = {
        length: null,
        sides: null,
        top: null,
        fringe: null,
        color: 'natural',
        type: 'straight',
        specialRequests: ''
    };
    
    // Available style options with display names
    const styleOptions = {
        length: {
            'buzz': 'Buzz Cut',
            'short': 'Short',
            'medium': 'Medium',
            'long': 'Long'
        },
        sides: {
            'fade': 'Fade',
            'taper': 'Taper',
            'undercut': 'Undercut',
            'buzzed': 'Buzzed'
        },
        top: {
            'slick-back': 'Slick Back',
            'quiff': 'Quiff',
            'pompadour': 'Pompadour',
            'textured': 'Textured'
        },
        fringe: {
            'side-part': 'Side Part',
            'straight': 'Straight',
            'swept': 'Swept',
            'none': 'None'
        },
        color: {
            'natural': 'Natural',
            'black': 'Black',
            'brown': 'Brown',
            'blonde': 'Blonde',
            'red': 'Red',
            'gray': 'Gray',
            'other': 'Other'
        },
        type: {
            'straight': 'Straight',
            'wavy': 'Wavy',
            'curly': 'Curly',
            'coily': 'Coily/Kinky'
        }
    };
    
    // Initialize the style generator
    function initStyleGenerator() {
        // Set default selections
        document.querySelectorAll('.option').forEach(option => {
            if (option.classList.contains('active')) {
                const category = option.closest('.tab-pane').id.replace('-tab', '');
                const value = option.getAttribute('data-option');
                currentStyle[category] = value;
            }
        });
        
        updateStyleSummary();
        generateStyleCode();
    }
    
    // Switch between different views (front, side, back)
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update preview image
            document.querySelectorAll('#previewImage img').forEach(img => {
                img.style.display = 'none';
            });
            document.getElementById(`${view}View`).style.display = 'block';
        });
    });
    
    // Switch between tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `${tabId}-tab`) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            const category = this.closest('.tab-pane').id.replace('-tab', '');
            const value = this.getAttribute('data-option');
            
            // Update active state
            document.querySelectorAll(`#${category}-tab .option`).forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update current style
            currentStyle[category] = value;
            
            // Update summary
            updateStyleSummary();
            
            // Generate new style code
            generateStyleCode();
            
            // Show save/share section if all main options are selected
            checkAllOptionsSelected();
        });
    });
    
    // Handle form controls
    const hairColorSelect = document.getElementById('hairColor');
    const hairTypeSelect = document.getElementById('hairType');
    const specialRequests = document.getElementById('specialRequests');
    
    if (hairColorSelect) {
        hairColorSelect.addEventListener('change', function() {
            currentStyle.color = this.value;
            updateStyleSummary();
            generateStyleCode();
        });
    }
    
    if (hairTypeSelect) {
        hairTypeSelect.addEventListener('change', function() {
            currentStyle.type = this.value;
            updateStyleSummary();
            generateStyleCode();
        });
    }
    
    if (specialRequests) {
        specialRequests.addEventListener('input', function() {
            currentStyle.specialRequests = this.value;
        });
    }
    
    // Update the style summary
    function updateStyleSummary() {
        let summaryHTML = '';
        
        // Add main style options to summary
        for (const [key, value] of Object.entries(currentStyle)) {
            if (value && styleOptions[key] && styleOptions[key][value]) {
                const displayName = key.charAt(0).toUpperCase() + key.slice(1);
                const optionName = styleOptions[key][value];
                
                summaryHTML += `
                    <li>
                        <span>${displayName}:</span>
                        <strong>${optionName}</strong>
                    </li>
                `;
            }
        }
        
        styleSummary.innerHTML = summaryHTML;
    }
    
    // Generate a unique style code
    function generateStyleCode() {
        const chars = '0123456789ABCDEF';
        let code = 'JRB-';
        
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        styleCode.textContent = code;
        return code;
    }
    
    // Check if all main options are selected
    function checkAllOptionsSelected() {
        const requiredOptions = ['length', 'sides', 'top', 'fringe'];
        const allSelected = requiredOptions.every(option => currentStyle[option] !== null);
        
        if (allSelected) {
            saveShareSection.style.display = 'block';
            saveShareSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Save style button
    if (saveStyleBtn) {
        saveStyleBtn.addEventListener('click', function() {
            // In a real app, this would save to a database
            alert('Style saved to your profile!');
        });
    }
    
    // Book appointment button
    if (bookAppointmentBtn) {
        bookAppointmentBtn.addEventListener('click', function() {
            // In a real app, this would redirect to booking with style pre-selected
            window.location.href = 'contact.html?style=' + encodeURIComponent(styleCode.textContent);
        });
    }
    
    // Download style button
    if (downloadStyleBtn) {
        downloadStyleBtn.addEventListener('click', function() {
            // In a real app, this would generate and download an image
            alert('This would generate and download an image of your style.');
        });
    }
    
    // Share style button
    if (shareStyleBtn) {
        shareStyleBtn.addEventListener('click', async function() {
            try {
                if (navigator.share) {
                    await navigator.share({
                        title: 'My Custom Haircut Style',
                        text: 'Check out this haircut style I created at Jay-R Barbershop!',
                        url: window.location.href
                    });
                } else {
                    // Fallback for browsers that don't support Web Share API
                    await navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                }
            } catch (err) {
                console.error('Error sharing:', err);
            }
        });
    }
    
    // Print style button
    if (printStyleBtn) {
        printStyleBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Copy style code button
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(styleCode.textContent);
                const originalText = copyCodeBtn.innerHTML;
                copyCodeBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    copyCodeBtn.innerHTML = originalText;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    }
    
    // Initialize the style generator
    initStyleGenerator();
});
