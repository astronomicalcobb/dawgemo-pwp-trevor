import 'flowbite'
import { createIcons, icons } from 'lucide'
import IMask from 'imask'
import emailjs from '@emailjs/browser'

emailjs.init('2Zxpf0h3F0WtUFVCf')
createIcons({ icons })

// Close mobile menu when navigation link is clicked
document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('navbar-menu')
  const navLinks = navMenu.querySelectorAll('a')
  const hamburgerButton = document.querySelector('[data-collapse-toggle="navbar-menu"]')

  // Remove focus from hamburger button after click
  if (hamburgerButton) {
    hamburgerButton.addEventListener('click', () => {
      setTimeout(() => {
        hamburgerButton.blur()
      }, 100)
    })
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close the menu by adding the 'hidden' class
      navMenu.classList.add('hidden')
    })
  })
})

// Google Maps initialization
const huskyLocation = { lat: 34.656926, lng: -106.757983 }
const huskyPlaceId = null

const serviceAreaCoords = [
  { lat: 34.787351, lng: -106.4659051 },
  { lat: 34.8044779, lng: -106.454148 },
  { lat: 34.8115781, lng: -106.4458863 },
  { lat: 34.8316977, lng: -106.4312297 },
  { lat: 34.8434193, lng: -106.4246463 },
  { lat: 34.8551409, lng: -106.4266452 },
  { lat: 34.8588326, lng: -106.4252106 },
  { lat: 34.8585803, lng: -106.4210291 },
  { lat: 34.8616743, lng: -106.418907 },
  { lat: 34.8658976, lng: -106.4253991 },
  { lat: 34.8723742, lng: -106.4291452 },
  { lat: 34.880111, lng: -106.4403533 },
  { lat: 34.9085421, lng: -106.4361933 },
  { lat: 34.9185357, lng: -106.4605515 },
  { lat: 34.9387701, lng: -106.4676958 },
  { lat: 34.9461519, lng: -106.4611561 },
  { lat: 34.9462857, lng: -106.4439727 },
  { lat: 34.9580619, lng: -106.4430096 },
  { lat: 34.9668834, lng: -106.4350073 },
  { lat: 34.9680592, lng: -106.4611168 },
  { lat: 34.9753976, lng: -106.4604409 },
  { lat: 34.9875761, lng: -106.4656823 },
  { lat: 34.9949723, lng: -106.4774489 },
  { lat: 35.0254557, lng: -106.4701111 },
  { lat: 35.0387297, lng: -106.4672996 },
  { lat: 35.0464913, lng: -106.4720737 },
  { lat: 35.0582414, lng: -106.464333 },
  { lat: 35.0620773, lng: -106.4679286 },
  { lat: 35.0618879, lng: -106.4803698 },
  { lat: 35.0671322, lng: -106.4824716 },
  { lat: 35.0759363, lng: -106.4804327 },
  { lat: 35.0794719, lng: -106.4793222 },
  { lat: 35.0818837, lng: -106.4771815 },
  { lat: 35.0847521, lng: -106.4774442 },
  { lat: 35.0855565, lng: -106.4737332 },
  { lat: 35.0884872, lng: -106.4749675 },
  { lat: 35.0938151, lng: -106.4729239 },
  { lat: 35.0985813, lng: -106.4724251 },
  { lat: 35.101774, lng: -106.4804731 },
  { lat: 35.101404, lng: -106.4844973 },
  { lat: 35.1027988, lng: -106.4869814 },
  { lat: 35.1057696, lng: -106.4865927 },
  { lat: 35.1079427, lng: -106.4869139 },
  { lat: 35.1083271, lng: -106.4879972 },
  { lat: 35.1093786, lng: -106.4889517 },
  { lat: 35.1120257, lng: -106.4878139 },
  { lat: 35.1141269, lng: -106.4883877 },
  { lat: 35.1152801, lng: -106.489262 },
  { lat: 35.1293974, lng: -106.4893585 },
  { lat: 35.1313319, lng: -106.4843423 },
  { lat: 35.1368615, lng: -106.4793449 },
  { lat: 35.1418297, lng: -106.4791537 },
  { lat: 35.1478051, lng: -106.4715216 },
  { lat: 35.146582, lng: -106.4653015 },
  { lat: 35.1545321, lng: -106.4657961 },
  { lat: 35.1594897, lng: -106.4619234 },
  { lat: 35.1623894, lng: -106.4599869 },
  { lat: 35.1653128, lng: -106.4591902 },
  { lat: 35.1668328, lng: -106.4614835 },
  { lat: 35.1760541, lng: -106.4726573 },
  { lat: 35.1828039, lng: -106.474041 },
  { lat: 35.1914573, lng: -106.4788109 },
  { lat: 35.1949871, lng: -106.4860612 },
  { lat: 35.2037379, lng: -106.5000577 },
  { lat: 35.2020813, lng: -106.5060697 },
  { lat: 35.2047419, lng: -106.5120153 },
  { lat: 35.2109089, lng: -106.5161037 },
  { lat: 35.2177794, lng: -106.5137709 },
  { lat: 35.2233887, lng: -106.5164668 },
  { lat: 35.2506585, lng: -106.5131676 },
  { lat: 35.2779264, lng: -106.4865124 },
  { lat: 35.293835, lng: -106.4467952 },
  { lat: 35.2970131, lng: -106.4034246 },
  { lat: 35.3152707, lng: -106.3705719 },
  { lat: 35.3651397, lng: -106.3997807 },
  { lat: 35.354518, lng: -106.3996393 },
  { lat: 35.3566251, lng: -106.4455723 },
  { lat: 35.4223313, lng: -106.4481155 },
  { lat: 35.1845703, lng: -106.768782 },
  { lat: 34.2900693, lng: -106.940983 },
  { lat: 34.2215248, lng: -106.901201 },
  { lat: 34.2154159, lng: -106.8813582 },
  { lat: 34.2054603, lng: -106.8423824 },
  { lat: 34.2071164, lng: -106.820059 },
  { lat: 34.1942308, lng: -106.7931568 },
  { lat: 34.1855127, lng: -106.7727564 },
  { lat: 34.1869464, lng: -106.7678923 },
  { lat: 34.2038166, lng: -106.7356408 },
  { lat: 34.212849, lng: -106.7324159 },
  { lat: 34.2141184, lng: -106.6536932 },
  { lat: 34.2715594, lng: -106.6196302 },
  { lat: 34.2831526, lng: -106.5986046 },
  { lat: 34.2992882, lng: -106.6153858 },
  { lat: 34.3029417, lng: -106.632085 },
  { lat: 34.3067822, lng: -106.6381069 },
  { lat: 34.3439598, lng: -106.6164884 },
  { lat: 34.3802843, lng: -106.5915011 },
  { lat: 34.4075346, lng: -106.5635747 },
  { lat: 34.4318599, lng: -106.5337942 },
  { lat: 34.4581589, lng: -106.5060563 },
  { lat: 34.463708, lng: -106.5069905 },
  { lat: 34.4702477, lng: -106.5029462 },
  { lat: 34.4775248, lng: -106.5001778 },
  { lat: 34.4831559, lng: -106.499711 },
  { lat: 34.4857446, lng: -106.4958106 },
  { lat: 34.4914881, lng: -106.4966787 },
  { lat: 34.5001453, lng: -106.4924058 },
  { lat: 34.4989838, lng: -106.4959916 },
  { lat: 34.5028443, lng: -106.4994059 },
  { lat: 34.5073116, lng: -106.5017714 },
  { lat: 34.5115782, lng: -106.500666 },
  { lat: 34.516767, lng: -106.499355 },
  { lat: 34.5204705, lng: -106.4975287 },
  { lat: 34.5216542, lng: -106.4991978 },
  { lat: 34.5252945, lng: -106.4970426 },
  { lat: 34.5293224, lng: -106.4990837 },
  { lat: 34.5332771, lng: -106.4973292 },
  { lat: 34.5382171, lng: -106.4936478 },
  { lat: 34.5430377, lng: -106.4969036 },
  { lat: 34.5491309, lng: -106.4975847 },
  { lat: 34.5524096, lng: -106.5006638 },
  { lat: 34.5579767, lng: -106.5002128 },
  { lat: 34.5620084, lng: -106.4965186 },
  { lat: 34.5661149, lng: -106.4992593 },
  { lat: 34.5696971, lng: -106.4960803 },
  { lat: 34.5743393, lng: -106.4962487 },
  { lat: 34.5803947, lng: -106.4971894 },
  { lat: 34.5857433, lng: -106.5007054 },
  { lat: 34.5922005, lng: -106.499755 },
  { lat: 34.5955842, lng: -106.4966376 },
  { lat: 34.5978412, lng: -106.4984262 },
  { lat: 34.6003809, lng: -106.4983266 },
  { lat: 34.6030934, lng: -106.4990501 },
  { lat: 34.6046755, lng: -106.5026059 },
  { lat: 34.6096486, lng: -106.5039304 },
  { lat: 34.6150996, lng: -106.5124675 },
  { lat: 34.6240255, lng: -106.5135784 },
  { lat: 34.6282728, lng: -106.5085066 },
  { lat: 34.6314603, lng: -106.5013744 },
  { lat: 34.6336393, lng: -106.4989111 },
  { lat: 34.6358184, lng: -106.5001386 },
  { lat: 34.6373972, lng: -106.5022243 },
  { lat: 34.6386934, lng: -106.5035377 },
  { lat: 34.6419922, lng: -106.5011002 },
  { lat: 34.6429606, lng: -106.4976326 },
  { lat: 34.6509495, lng: -106.48756 },
  { lat: 34.6604911, lng: -106.4822929 },
  { lat: 34.6711007, lng: -106.467636 },
  { lat: 34.6802169, lng: -106.4676016 },
  { lat: 34.6896153, lng: -106.4610433 },
  { lat: 34.6999414, lng: -106.4496415 },
  { lat: 34.7054845, lng: -106.456557 },
  { lat: 34.7072171, lng: -106.4627864 },
  { lat: 34.7149161, lng: -106.4632292 },
  { lat: 34.7351115, lng: -106.4689232 },
  { lat: 34.7537757, lng: -106.4600545 },
  { lat: 34.7716411, lng: -106.4670399 }
]

const darkMapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
  { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] }
]

const lightMapStyles = []

let serviceAreaMap, contactMap, contactMarker, serviceAreaPolygon

function isDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ||
    document.documentElement.classList.contains('dark')
}

function getMapStyles() {
  return isDarkMode() ? darkMapStyles : lightMapStyles
}

async function initMaps() {
  const { Map } = await google.maps.importLibrary('maps')
  const { Marker } = await google.maps.importLibrary('marker')
  const { PlacesService } = await google.maps.importLibrary('places')

  const mapOptions = {
    zoom: 8,
    center: huskyLocation,
    styles: getMapStyles(),
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true
  }

  const serviceAreaEl = document.getElementById('service-area-map')
  if (serviceAreaEl) {
    const bounds = new google.maps.LatLngBounds()
    serviceAreaCoords.forEach(coord => bounds.extend(coord))
    const polygonCenter = bounds.getCenter()

    serviceAreaMap = new Map(serviceAreaEl, {
      ...mapOptions,
      center: polygonCenter
    })

    const { Polygon } = await google.maps.importLibrary('maps')
    serviceAreaPolygon = new Polygon({
      paths: serviceAreaCoords,
      strokeColor: '#0F9D58',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0F9D58',
      fillOpacity: 0.15,
      map: serviceAreaMap
    })

    serviceAreaMap.fitBounds(bounds, { top: 10, right: 10, bottom: 10, left: 10 })
  }

  const contactMapEl = document.getElementById('contact-map')
  if (contactMapEl) {
    contactMap = new Map(contactMapEl, {
      ...mapOptions,
      zoom: 15
    })

    contactMarker = new Marker({
      map: contactMap,
      position: huskyLocation,
      title: 'Husky Well & Pump Service'
    })

    const service = new PlacesService(contactMap)
    const request = {
      location: huskyLocation,
      radius: 50,
      query: 'Husky Well & Pump Service'
    }

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
        const place = results[0]

        // Get detailed info
        service.getDetails({ placeId: place.place_id }, (placeDetails, detailStatus) => {
          if (detailStatus === google.maps.places.PlacesServiceStatus.OK && placeDetails) {
            renderPlaceDetailsLegacy(placeDetails)
          } else {
            renderPlaceDetailsError()
          }
        })
      } else {
        renderPlaceDetailsError()
      }
    })
  }
}

function renderPlaceDetailsLegacy(place) {
  const container = document.getElementById('place-details')
  if (!container) return

  const rating = place.rating
    ? `<div class="flex items-center gap-1 mt-2">
        <span class="text-warning">★</span>
        <span class="text-base-850 dark:text-base-100 font-medium">${place.rating.toFixed(1)}</span>
        <span class="text-base-850 dark:text-base-100 text-sm">(${place.user_ratings_total} reviews)</span>
       </div>`
    : ''

  let openStatus = ''
  if (place.opening_hours?.isOpen) {
    try {
      const isOpen = place.opening_hours.isOpen()
      openStatus = isOpen
        ? '<span class="text-success dark:text-dark-success font-medium">Open now</span>'
        : '<span class="text-error dark:text-dark-error font-medium">Closed now</span>'
    } catch (e) {
      openStatus = ''
    }
  }

  const hours = place.opening_hours?.weekday_text
    ? `<div class="mt-3">
        <button id="toggle-hours" class="text-secondary dark:text-dark-secondary text-sm font-medium hover:underline hover:cursor-pointer flex items-center gap-1">
          <span>View hours</span>
          <svg class="w-4 h-4 transition-transform" id="hours-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div id="hours-list" class="hidden mt-2 text-sm text-base-850 dark:text-base-100 space-y-1">
          ${place.opening_hours.weekday_text.map(day => `<p>${day}</p>`).join('')}
        </div>
       </div>`
    : ''

  container.innerHTML = `
    <h3 class="text-lg font-bold text-base-850 dark:text-dark-base-content">${place.name}</h3>
    <p class="text-base-850 dark:text-base-100 text-sm mt-1">${place.formatted_address}</p>
    ${rating}
    <div class="mt-2">${openStatus}</div>
    ${hours}
    <a href="${place.url}"
       target="_blank"
       rel="noopener noreferrer"
       class="inline-block mt-3 text-secondary dark:text-dark-secondary text-sm font-medium hover:underline">
      View on Google Maps →
    </a>
  `

  const toggleBtn = document.getElementById('toggle-hours')
  const hoursList = document.getElementById('hours-list')
  const chevron = document.getElementById('hours-chevron')

  if (toggleBtn && hoursList) {
    toggleBtn.addEventListener('click', () => {
      hoursList.classList.toggle('hidden')
      chevron.classList.toggle('rotate-180')
    })
  }
}

function renderPlaceDetailsError() {
  const container = document.getElementById('place-details')
  if (!container) return

  const mapsUrl = huskyPlaceId
    ? `https://www.google.com/maps/place/?q=place_id:${huskyPlaceId}`
    : `https://www.google.com/maps/search/?api=1&query=${huskyLocation.lat},${huskyLocation.lng}`

  container.innerHTML = `
    <h3 class="text-lg font-bold text-base-content dark:text-dark-base-content">Husky Well & Pump Service</h3>
    <p class="text-dark-base-400 dark:accent-dark-base-200 text-sm mt-1">Belen, NM</p>
    <a href="${mapsUrl}"
       target="_blank"
       rel="noopener noreferrer"
       class="inline-block mt-3 text-secondary dark:text-dark-secondary text-sm font-medium hover:underline">
      View on Google Maps →
    </a>
  `
}

function updateMapStyles() {
  const styles = getMapStyles()
  if (serviceAreaMap) {
    serviceAreaMap.setOptions({ styles })
  }
  if (contactMap) {
    contactMap.setOptions({ styles })
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateMapStyles)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMaps)
} else {
  initMaps()
}

// Name formatting function
function formatName(input) {
  let value = input.value
  value = value.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase())
  input.value = value
}

// Call the formatName function when the user types in the input field
document.getElementById('name').addEventListener('input', function (e) {
  formatName(e.target)
})

// Masking phone input
const phoneInput = document.getElementById('phone')
const phoneMask = IMask(phoneInput, {
  mask: '(000) 000-0000'
})

// Email validation
const emailInput = document.querySelector('input[type="email"]')
emailInput.addEventListener('input', function() {
  const email = this.value
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!isValid && email.length > 0) {
    this.setCustomValidity('Please enter a valid email')
  } else {
    this.setCustomValidity('')
  }
})

// Subject length counter
function formatSubject() {
  const subjectInput = document.getElementById('subject')
  const counter = document.getElementById('subjectCounter')
  const maxLength = 128


  subjectInput.addEventListener('input', function (e) {
    const length = e.target.value.length

    counter.textContent = `(${length}/${maxLength})`

    if (length === maxLength || length < 4) {
      counter.className = 'text-sm text-error dark:text-dark-error ml-2 font-semibold'
    } else if (length > maxLength * 0.8) {
      counter.className = 'text-sm text-warning dark:text-dark-warning ml-2 font-semibold'
    } else {
      counter.className = 'text-sm text-success dark:text-dark-success ml-2 font-semibold'
    }
  })
}

// Call the formatSubject function when the page loads
formatSubject()

// Message length counter
function formatMessage() {
  const messageInput = document.getElementById('message')
  const counter = document.getElementById('messageCounter')
  const maxLength = 1024
  const minLength = 16

  messageInput.addEventListener('input', function (e) {
    let length = e.target.value.length

    counter.textContent = `(${length}/${maxLength})`

    if (length === maxLength || length < minLength) {
      counter.className = 'text-sm text-error dark:text-dark-error ml-2 font-semibold'
    } else if (length > maxLength * 0.8) {
      counter.className = 'text-sm text-warning dark:text-dark-warning ml-2 font-semibold'
    } else if (length >= minLength) {
      counter.className = 'text-sm text-success dark:text-dark-success ml-2 font-semibold'
    }
  })
}

// Call the formatMessage function when the page loads
formatMessage()

// Submit form
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault()

  const formStatus = document.getElementById('formStatus')
  const submitButton = e.target.querySelector('button[type="submit"]')

  formStatus.textContent = ''

  const name = document.getElementById('name').value.trim()
  const nameParts = name.split(/\s+/).filter(part => part.length > 0)
  if (nameParts.length < 2) {
    formStatus.textContent = 'Please enter both first and last name.'
    formStatus.className = 'text-center text-sm text-error dark:text-dark-error mt-2'
    return
  }

  const subject = document.getElementById('subject').value.trim()
  if (subject.length < 4) {
    formStatus.textContent = 'Subject must be at least 4 characters.'
    formStatus.className = 'text-center text-sm text-error dark:text-dark-error mt-2'
    return
  }

  const message = document.getElementById('message').value.trim()
  if (message.length < 16) {
    formStatus.textContent = 'Message must be at least 20 characters.'
    formStatus.className = 'text-center text-sm text-error dark:text-dark-error mt-2'
    return
  }

  submitButton.disabled = true
  submitButton.textContent = 'Sending...'

  const templateParams = {
    from_name: name,
    phone: phoneInput.value,
    from_email: emailInput.value,
    subject: subject,
    message: message
  }

  emailjs.send('service_8uwodx9', 'template_8ir0hso', templateParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status)
      formStatus.textContent = 'Thank you! Your message has been sent successfully.'
      formStatus.className = 'text-center text-sm text-success dark:text-dark-success mt-2'
      document.getElementById('contactForm').reset()
      phoneMask.value = ''

      document.getElementById('subjectCounter').textContent = '(0/128)'
      document.getElementById('subjectCounter').className = 'ml-2 text-sm text-dark-base-100 dark:text-dark-base-200'
      document.getElementById('messageCounter').textContent = '(0/1024)'
      document.getElementById('messageCounter').className = 'ml-2 text-sm text-dark-base-100 dark:text-dark-base-200'
    })
    .catch(function (error) {
      console.error('FAILED...', error)
      formStatus.textContent = 'Failed to send message. Please try again or call us directly.'
      formStatus.className = 'text-center text-sm text-error dark:text-dark-error mt-2'
    })
    .finally(function () {
      submitButton.disabled = false
      submitButton.textContent = 'Send Message'
    })
})