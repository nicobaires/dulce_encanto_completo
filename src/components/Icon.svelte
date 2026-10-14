<script lang="ts">
  import { icons, normalizeIconName } from '../lib/icons';

  interface Props {
    name: string;
    class?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
    [key: string]: any;
  }

  let { name, class: className = '', 'aria-hidden': ariaHidden = true, ...rest }: Props = $props();

  let key = $derived(normalizeIconName(name));
  let icon = $derived(icons[key]);
</script>

{#if icon}
  <svg
    viewBox={icon.viewBox}
    fill="currentColor"
    aria-hidden={ariaHidden ? 'true' : undefined}
    class={`inline-block w-[1em] h-[1em] align-[-0.125em] fill-current shrink-0 ${className}`}
    {...rest}
  >
    {#each icon.paths as d}
      <path {d} />
    {/each}
  </svg>
{:else}
  <span class={className}>{name}</span>
{/if}

