import russianMessages from 'ra-language-russian'

export default {
  ra: {
    ...russianMessages.ra,
    action: {
      ...russianMessages.ra.action,
      remove_all_filters: 'Удалить все фильтры',
    },
    notification: {
      ...russianMessages.ra.notification,
    },
  },
}
