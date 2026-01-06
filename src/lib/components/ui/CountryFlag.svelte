<script lang="ts">
	// Map country names to ISO country codes
	const countryToCode: Record<string, string> = {
		'Argentina': 'AR',
		'Australia': 'AU',
		'Azerbaijan': 'AZ',
		'Belgium': 'BE',
		'Bosnia and Herzegovina': 'BA',
		'Brazil': 'BR',
		'Bulgaria': 'BG',
		'Cameroon': 'CM',
		'Canada': 'CA',
		'China': 'CN',
		'Cuba': 'CU',
		'Czech Republic': 'CZ',
		'Denmark': 'DK',
		'Dominican Republic': 'DO',
		'Egypt': 'EG',
		'England': 'GB',
		'Estonia': 'EE',
		'Finland': 'FI',
		'France': 'FR',
		'Georgia': 'GE',
		'Germany': 'DE',
		'Greece': 'GR',
		'India': 'IN',
		'Israel': 'IL',
		'Italy': 'IT',
		'Japan': 'JP',
		'Kazakhstan': 'KZ',
		'Latvia': 'LV',
		'Mexico': 'MX',
		'Monaco': 'MC',
		'Netherlands': 'NL',
		'Northern Ireland': 'GB',
		'Norway': 'NO',
		'Poland': 'PL',
		'Portugal': 'PT',
		'Puerto Rico': 'PR',
		'Romania': 'RO',
		'Russia': 'RU',
		'Serbia': 'RS',
		'Slovakia': 'SK',
		'Slovenia': 'SI',
		'South Africa': 'ZA',
		'South Korea': 'KR',
		'Spain': 'ES',
		'Sweden': 'SE',
		'Switzerland': 'CH',
		'Thailand': 'TH',
		'Turkey': 'TR',
		'Ukraine': 'UA',
		'United Kingdom': 'GB',
		'United States': 'US',
		'USA': 'US',
		'Uruguay': 'UY',
		'Uzbekistan': 'UZ',
		'Venezuela': 'VE'
	};

	export let country: string | undefined;
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-6 h-6'
	};

	$: code = country ? (countryToCode[country] || country) : '';
	$: flagUrl = code && code.length === 2 
		? `https://flagcdn.com/${size === 'sm' ? '16x12' : size === 'md' ? '20x15' : '24x18'}/${code.toLowerCase()}.png`
		: null;
</script>

{#if flagUrl}
	<img 
		src={flagUrl} 
		alt={country || 'Country flag'}
		class="{sizeClasses[size]} rounded object-cover border border-gray-200 dark:border-gray-700"
		loading="lazy"
	/>
{:else}
	<span class="text-lg">🌍</span>
{/if}



