import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export function formatVietnameseDate(dateStr: string): string {
  // Parse the input date string into a Date object
  const date = new Date(dateStr);

  // Format the date using date-fns with the Vietnamese locale
  const formattedDate = format(date, 'MMM d, yyyy h:mm a', { locale: vi });

  // Replace "SA" with "CH" for PM and "SA" for AM in Vietnamese context
  return formattedDate.replace('AM', 'SA').replace('PM', 'CH');
}
