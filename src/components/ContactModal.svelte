<!-- ContactModal.svelte -->
<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import Button from './ui/Button.svelte';
  
  let { isOpen, onClose } = $props<{
      isOpen: boolean;
      onClose: () => void;
  }>();

  let formData = $state({
      name: '',
      email: '',
      message: ''
  });

  function closeModal() {
      onClose();
  }

  function handleSubmit(event: SubmitEvent) {
      event.preventDefault();
      // Handle form submission logic here
      console.log('Form submitted:', formData);
      closeModal();
  }
</script>

{#if isOpen}
  <div 
      class="fixed inset-0 z-50 flex items-center justify-center"
      transition:fade={{ duration: 200 }}
  >
      <!-- Backdrop - using button for accessibility -->
      <button 
          class="modal-backdrop absolute inset-0 bg-black/50 backdrop-blur-sm"
          onclick={closeModal}
          aria-label="Close modal"
      ></button>
      
      <!-- Modal -->
      <div
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
          class="relative w-full max-w-lg rounded-lg bg-gray-600 p-6 shadow-xl"
          transition:scale={{ duration: 200, start: 0.95 }}
      >
          <div class="mb-4 flex items-center justify-between">
              <h2 id="modal-title" class="text-xl font-bold text-gray-base">Get in Touch</h2>
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

          <form onsubmit={handleSubmit} class="space-y-4">
              <div class="space-y-4">
                  <div>
                      <label for="name" class="mb-2 block text-sm font-medium text-gray-100">Name</label>
                      <input
                          type="text"
                          id="name"
                          bind:value={formData.name}
                          class="w-full rounded-md border border-gray-500 bg-gray-700 p-2 text-gray-base focus:border-teal-300 focus:outline-none"
                          required
                          aria-required="true"
                      />
                  </div>

                  <div>
                      <label for="email" class="mb-2 block text-sm font-medium text-gray-100">Email</label>
                      <input
                          type="email"
                          id="email"
                          bind:value={formData.email}
                          class="w-full rounded-md border border-gray-500 bg-gray-700 p-2 text-gray-base focus:border-teal-300 focus:outline-none"
                          required
                          aria-required="true"
                      />
                  </div>

                  <div>
                      <label for="message" class="mb-2 block text-sm font-medium text-gray-100">Message</label>
                      <textarea
                          id="message"
                          bind:value={formData.message}
                          rows="4"
                          class="w-full rounded-md border border-gray-500 bg-gray-700 p-2 text-gray-base focus:border-teal-300 focus:outline-none"
                          required
                          aria-required="true"
                      ></textarea>
                  </div>
              </div>

              <div class="flex justify-end gap-3 pt-4">
                  <Button 
                      size="md" 
                      on:click={closeModal}
                      type="button"
                  >
                      Cancel
                  </Button>
                  <Button 
                      size="md" 
                      type="submit"
                  >
                      Send Message
                  </Button>
              </div>
          </form>
      </div>
  </div>
{/if}
