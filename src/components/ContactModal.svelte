<!-- ContactModal.svelte -->
<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import Button from './ui/Button.svelte';
  import emailjs from '@emailjs/browser';
  
  let { isOpen, onClose } = $props<{
      isOpen: boolean;
      onClose: () => void;
  }>();


  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const apiKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  let formData = $state({
      firstname: '',
      lastname:'',
      email: '',
      companyName: '',
      message: ''
  });

  let isLoading = $state(false);
  let errorMessage = $state('');
  let successMessage = $state('');

  function closeModal() {
      onClose();
      // Reset form state
      errorMessage = '';
      successMessage = '';
      formData = {
          firstname: '',
          lastname: '',
          email: '',
          companyName: '',
          message: ''
      };
  }

  async function handleSubmit(event: SubmitEvent) {
      event.preventDefault();
      isLoading = true;
      errorMessage = '';
      successMessage = '';

      try {
          // Replace these with your EmailJS credentials
          const templateParams = {
              to_email: 'hello@iki.studio',
              from_name: `${formData.firstname} ${formData.lastname}`,
              from_email: formData.email,
              company_name: formData.companyName,
              message: formData.message
          };

          await emailjs.send(
              emailServiceId || 'service_o9k723s',
              templateId || 'template_mkx6l5j',
              templateParams,
              apiKey || 'RbyP53s9N9RvOlKor'
          );

          successMessage = 'Message sent successfully!';
          setTimeout(closeModal, 2000); // Close modal after 2 seconds
      } catch (error) {
          console.error('Failed to send email:', error);
          errorMessage = 'Failed to send message. Please try again later.';
      } finally {
          isLoading = false;
      }
  }
</script>

{#if isOpen}
  <div 
      class="fixed inset-0 z-50 flex items-center justify-center"
      transition:fade={{ duration: 200 }}
  >
      <button 
          class="modal-backdrop absolute inset-0 bg-black/50 backdrop-blur-sm"
          onclick={closeModal}
          aria-label="Close modal"
      ></button>
      
      <div
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
          class="relative w-full max-w-lg rounded-lg bg-gray-600 p-6 shadow-xl"
          transition:scale={{ duration: 200, start: 0.95 }}
      >
          <div class="mb-4 flex items-center justify-between">
            <div class=""
            >
            <h2 id="modal-title" class="text-xl font-bold text-gray-base">What’s your idea?</h2>
            <p class=" text-gray-100 text-body-2-regular">Have a groundbreaking idea or a project in mind? We're here to collaborate and make it a reality. Reach out to us and let's start building together!</p>
          </div>
             

              <button 
                  type="button"
                  class="text-gray-200 hover:text-gray-100"
                  onclick={closeModal}
                  aria-label="Close modal"
              >
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
          </div>

          {#if errorMessage}
              <div class="mb-4 rounded-md bg-red-100 p-3 text-red-700">
                  {errorMessage}
              </div>
          {/if}

          {#if successMessage}
              <div class="mb-4 rounded-md bg-green-100 p-3 text-green-700">
                  {successMessage}
              </div>
          {/if}

          <form onsubmit={handleSubmit} class="space-y-4">
              <div class="space-y-4">
                  <div>
                      <label for="firstname" class="mb-2 block text-sm font-medium text-gray-100">First Name</label>
                      <input
                          type="text"
                          id="firstname"
                          bind:value={formData.firstname}
                          class="w-full rounded-md border border-gray-500 bg-gray-600 p-2 text-gray-base focus:border-gray-50 focus:outline-none"
                          required
                          aria-required="true"
                          disabled={isLoading}
                      />
                  </div>
                  <div>
                    <label for="lastname" class="mb-2 block text-sm font-medium text-gray-100">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        bind:value={formData.lastname}
                        class="w-full rounded-md border border-gray-500 bg-gray-600 p-2 text-gray-base focus:border-gray-50 focus:outline-none"
                        required
                        aria-required="true"
                        disabled={isLoading}
                    />
                </div>

                  <div>
                      <label for="email" class="mb-2 block text-sm font-medium text-gray-100">Email</label>
                      <input
                          type="email"
                          id="email"
                          bind:value={formData.email}
                          class="w-full rounded-md border border-gray-500 bg-gray-600 p-2 text-gray-base focus:border-gray-50 focus:outline-none"
                          required
                          aria-required="true"
                          disabled={isLoading}
                      />
                  </div>

                  <div>
                    <label for="companyName" class="mb-2 block text-sm font-medium text-gray-100">Company Name</label>
                    <input
                        type="text"
                        id="companyName"
                        bind:value={formData.companyName}
                        class="w-full rounded-md border border-gray-500 bg-gray-600 p-2 text-gray-base focus:border-gray-50 focus:outline-none"
                        required
                        aria-required="true"
                        disabled={isLoading}
                    />
                </div>

                  <div>
                      <label for="message" class="mb-2 block text-sm font-medium text-gray-100">Message</label>
                      <textarea
                          id="message"
                          bind:value={formData.message}
                          rows="4"
                          class="w-full rounded-md border border-gray-500 bg-gray-600 p-2 text-gray-base focus:border-gray-50 focus:outline-none"
                          required
                          aria-required="true"
                          disabled={isLoading}
                      ></textarea>
                  </div>
              </div>

              <div class="flex justify-end gap-3 pt-4">
                  <Button 
                      size="md" 
                      on:click={closeModal}
                      type="button"
                      disabled={isLoading}
                  >
                      Cancel
                  </Button>
                  <Button 
                      size="md" 
                      type="submit"
                      disabled={isLoading}
                  >
                      {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
              </div>
          </form>
      </div>
  </div>
{/if}
