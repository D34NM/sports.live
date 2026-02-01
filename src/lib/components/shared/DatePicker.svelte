<script lang="ts">
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-svelte';
import Button from '../ui/Button.svelte';

interface Props {
selectedDate: Date;
onDateChange: (date: Date) => void;
}

let { selectedDate, onDateChange }: Props = $props();

function formatDate(date: Date) {
return date.toLocaleDateString('en-US', {
weekday: 'short',
month: 'long',
day: 'numeric',
year: 'numeric'
});
}

function goToPreviousDay() {
const newDate = new Date(selectedDate);
newDate.setDate(newDate.getDate() - 1);
onDateChange(newDate);
}

function goToNextDay() {
const newDate = new Date(selectedDate);
newDate.setDate(newDate.getDate() + 1);
onDateChange(newDate);
}

function goToToday() {
onDateChange(new Date());
}

function isToday() {
const today = new Date();
return (
selectedDate.getDate() === today.getDate() &&
selectedDate.getMonth() === today.getMonth() &&
selectedDate.getFullYear() === today.getFullYear()
);
}
</script>

<div
class="flex items-center justify-between gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-lg"
>
<Button
variant="secondary"
size="md"
onclick={goToPreviousDay}
aria-label="Previous day"
class="flex items-center gap-2"
>
<ChevronLeft class="w-5 h-5" />
</Button>

<div class="flex-1 text-center">
<div class="flex items-center justify-center gap-2 mb-1">
<Calendar class="w-5 h-5 text-blue-600 dark:text-blue-400" />
<div class="text-xl font-bold text-gray-900 dark:text-white">
{formatDate(selectedDate)}
</div>
</div>
{#if !isToday()}
<button
onclick={goToToday}
class="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
>
Jump to Today
</button>
{/if}
</div>

<Button
variant="secondary"
size="md"
onclick={goToNextDay}
aria-label="Next day"
class="flex items-center gap-2"
>
<ChevronRight class="w-5 h-5" />
</Button>
</div>
