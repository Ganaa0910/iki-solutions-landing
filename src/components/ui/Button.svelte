<!-- Button.svelte -->
<script lang="ts">
  import { Isax } from 'isaxvelte';
  
  export let type: "button" | "submit" | "reset" = "button";
  export let variant: "primary" | "secondary" | "outline" = "primary";
  export let size: "sm" | "md" | "lg" = "md";
  export let disabled = false;
  export let leftIcon: string | null = null;  // Changed to accept icon name
  export let rightIcon: string | null = null; // Changed to accept icon name
  export let iconType: "bold" | "outline" | "broken" | "bulk" | "linear" | "twotone" = "outline";
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-btn-32',
		md: 'px-5 py-2 text-btn-40',
		lg: 'px-6 py-2 text-btn-48'
  };
  
  const iconSizes = {
    sm: '16px',
    md: '20px',
    lg: '24px'
  };
  
  const variantClasses = {
    primary: 'bg-gray-50 hover:bg-gray-100 text-gray-600',
		secondary: 'bg-opacity-white4 back backdrop-blur-20 text-gray-50 hover:bg-gray-300',
		outline: 'border-2 border-opacity-white8 bg-transparent hover:bg-gray-50',
		text: 'bg-transparent hover:bg-gray-50'
  };
</script>

<button
  {type}
  {disabled}
  class="inline-flex items-center justify-center gap-2 rounded-[12px] transition-colors 
    {sizeClasses[size]} {variantClasses[variant]}"
  on:click
>
  {#if leftIcon}
    <Isax 
      name={leftIcon} 
      type={iconType} 
      size={iconSizes[size]} 
    />
  {/if}
  
  <slot />
  
  {#if rightIcon}
    <Isax 
      name={rightIcon} 
      type={iconType} 
      size={iconSizes[size]} 
    />
  {/if}
</button>