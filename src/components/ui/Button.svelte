<script>
  export let variant = 'primary';
  export let size = 'md';
  export let leftIcon = null;
  export let rightIcon = null;
  export let disabled = false;
  export let className = '';

  // Compute classes based on props
  $: variantClasses = {
    primary: 'bg-gray-50 hover:bg-gray-100',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-gray-200 bg-transparent hover:bg-gray-50',
    text: 'bg-transparent hover:bg-gray-50'
  }[variant];

  $: sizeClasses = {
    sm: 'h-8 px-3 py-2 text-btn-32',
    md: 'h-10 px-5 text-btn-40',
    lg: 'h-12 px-6 text-btn-48'
  }[size];

  $: buttonClasses = `
    inline-flex items-center font-medium rounded-[12px] transition-all duration-200
    ${variantClasses}
    ${sizeClasses}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;
</script>

<button
  class={buttonClasses}
  {disabled}
  on:click
>
  {#if leftIcon}
    <svelte:component this={leftIcon} />
  {/if}
  <slot></slot>
  {#if rightIcon}
    <svelte:component this={rightIcon} />
  {/if}
</button>