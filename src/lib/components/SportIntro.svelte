<script lang="ts">
  import { getSportIntro } from '$lib/data/sportIntros';
  
  export let sport: string;
  
  $: sportIntro = getSportIntro(sport);
  
  let expanded = false;
  
  function toggleExpanded() {
    expanded = !expanded;
  }
  
  // Get excerpt (first ~200 characters ending at a sentence)
  function getExcerpt(text: string): string {
    const sentences = text.split('. ');
    let excerpt = sentences[0];
    let currentLength = excerpt.length;
    
    for (let i = 1; i < sentences.length && currentLength < 200; i++) {
      const nextSentence = sentences[i];
      if (currentLength + nextSentence.length > 300) break;
      excerpt += '. ' + nextSentence;
      currentLength = excerpt.length;
    }
    
    return excerpt + (excerpt.endsWith('.') ? '' : '.');
  }
  
  $: excerpt = sportIntro ? getExcerpt(sportIntro.intro) : '';
  $: remainingText = sportIntro ? sportIntro.intro.substring(excerpt.length) : '';
</script>

{#if sportIntro}
<section class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
    <div class="max-w-4xl">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {sportIntro.title}
      </h2>
      
      <div class="prose prose-gray dark:prose-invert max-w-none">
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          {excerpt}
          {#if !expanded && remainingText}
            <span class="text-gray-500">...</span>
          {/if}
          {#if expanded && remainingText}
            <span>{remainingText}</span>
          {/if}
        </p>
        
        {#if remainingText}
          <button 
            on:click={toggleExpanded}
            class="inline-flex items-center gap-1 mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
          >
            {expanded ? 'Show Less' : 'Read More'}
            <svg 
              class="w-4 h-4 transition-transform duration-200 {expanded ? 'rotate-180' : ''}" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        {/if}
      </div>
    </div>
  </div>
</section>
{/if}