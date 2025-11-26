import 'flowbite'
import { createIcons, icons } from 'lucide'
import IMask from 'imask'
import emailjs from '@emailjs/browser'

emailjs.init('2Zxpf0h3F0WtUFVCf')
createIcons({ icons })

// Format name
function formatName(input) {
  let value = input.value
  value = value.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase())
  input.value = value
}
document.getElementById('name').addEventListener('input', function(e) {
  formatName(e.target)
})

// Format phone number
const phoneInput = document.getElementById('phone')
const phoneMask = IMask(phoneInput, {
  mask: '(000) 000-0000'
})

// Format email
document.getElementById('email').addEventListener('input', function(e) {
  e.target.value = e.target.value.toLowerCase().trim()
})

// Format subject with counter
document.getElementById('subject').addEventListener('input', function(e) {
  const counter = document.getElementById('subjectCounter')
  const length = e.target.value.length
  const maxLength = 128

  counter.textContent = `(${length}/${maxLength})`

  if (length === maxLength) {
    counter.className = 'text-sm text-red-600 dark:text-red-400 ml-2'
  } else if (length > maxLength * 0.7) {
    counter.className = 'text-sm text-yellow-600 dark:text-yellow-400 ml-2'
  } else {
    counter.className = 'text-sm text-green-600 dark:text-green-400 ml-2'
  }
})

// Format message with counter and hints
function setupMessageFormatting() {
  const messageInput = document.getElementById('message')
  const counter = document.getElementById('messageCounter')
  const minLength = 16
  const maxLength = 1024

  messageInput.addEventListener('input', function(e) {
    const length = e.target.value.length

    // Update counter
    counter.textContent = `(${length}/${maxLength})`

    // Color code counter
    if (length === maxLength) {
      counter.className = 'text-sm text-red-600 dark:text-red-400 ml-2 font-semibold'
    } else if (length > maxLength * 0.8) {
      counter.className = 'text-sm text-yellow-600 dark:text-yellow-400 ml-2'
    } else if (length >= minLength) {
      counter.className = 'text-sm text-green-600 dark:text-green-400 ml-2'
    } else {
      counter.className = 'text-sm text-slate-500 dark:text-slate-400 ml-2'
    }
  })
}
setupMessageFormatting()

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault()

  const formStatus = document.getElementById('formStatus')
  const submitButton = e.target.querySelector('button[type="submit"]')

  // Clear previous status
  formStatus.textContent = ''

  // Validate name has first and last
  const name = document.getElementById('name').value.trim()
  const nameParts = name.split(/\s+/).filter(part => part.length > 0)
  if (nameParts.length < 2) {
    formStatus.textContent = 'Please enter both first and last name.'
    formStatus.className = 'text-center text-sm text-red-600 dark:text-red-400 mt-2'
    return
  }

  // Validate subject length
  const subject = document.getElementById('subject').value.trim()
  if (subject.length < 5) {
    formStatus.textContent = 'Subject must be at least 5 characters.'
    formStatus.className = 'text-center text-sm text-red-600 dark:text-red-400 mt-2'
    return
  }

  // Validate message length
  const message = document.getElementById('message').value.trim()
  if (message.length < 16) {
    formStatus.textContent = 'Message must be at least 20 characters.'
    formStatus.className = 'text-center text-sm text-red-600 dark:text-red-400 mt-2'
    return
  }

  submitButton.disabled = true
  submitButton.textContent = 'Sending...'

  const templateParams = {
    from_name: name,
    from_email: document.getElementById('email').value,
    phone: phoneMask.unmaskedValue, // ✅ Fixed: Get just the digits
    subject: subject,
    message: message
  }

  emailjs.send('service_8uwodx9', 'template_8ir0hso', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status)
      formStatus.textContent = 'Thank you! Your message has been sent successfully.'
      formStatus.className = 'text-center text-sm text-green-600 dark:text-green-400 mt-2'
      document.getElementById('contactForm').reset()
      phoneMask.value = '' // Reset mask
    })
    .catch(function(error) {
      console.error('FAILED...', error)
      formStatus.textContent = 'Failed to send message. Please try again or call us directly.'
      formStatus.className = 'text-center text-sm text-red-600 dark:text-red-400 mt-2'
    })
    .finally(function() {
      submitButton.disabled = false
      submitButton.textContent = 'Send Message'
    })
})