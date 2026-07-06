/**
 * Инициализация FormSender с FormSenderMessager для CMS (EvoCMS)
 * 
 * Этот код необходим для интеграции с CMS системой.
 * FormSenderMessager позволяет использовать кастомные обработчики сообщений
 * вместо стандартных alert/confirm.
 * 
 * Используется Toast для отображения уведомлений об успехе/ошибке отправки форм.
 */

// Флаг для предотвращения повторной инициализации
let formSenderInitialized = false;

export function initFormSender() {
  // Предотвращаем повторную инициализацию
  if (formSenderInitialized) {
    return;
  }

  // Проверяем наличие необходимых компонентов
  if (typeof FormSender === 'undefined') {
    console.warn('FormSender не найден. Убедитесь, что библиотека подключена.');
    return;
  }

  if (typeof FormSenderMessager === 'undefined') {
    console.warn('FormSenderMessager не найден. Убедитесь, что библиотека подключена.');
    return;
  }

  if (!window.Toast) {
    console.warn('Toast не найден. Убедитесь, что компонент toast.js подключен.');
    return;
  }

  // Инициализируем FormSender со своим messager для всех форм на странице
  // ИСКЛЮЧАЕМ формы в модальных окнах - они инициализируются отдельно в Modal.js
  // Ищем все обертки форм с классом .form-wrapper, которые НЕ находятся в модальных окнах
  const allFormWrappers = document.querySelectorAll('.form-wrapper');
  const modalFormWrappers = document.querySelectorAll('.modal .form-wrapper');
  const pageFormWrappers = Array.from(allFormWrappers).filter(
    wrapper => {
      // Исключаем формы в модальных окнах
      const isInModal = wrapper.closest('.modal') !== null;
      // Исключаем уже инициализированные формы
      const isInitialized = wrapper.hasAttribute('data-form-sender-initialized');
      return !isInModal && !isInitialized;
    }
  );
  
  if (pageFormWrappers.length === 0) {
    // Если форм на странице нет (кроме модальных), ничего не делаем
    return;
  }

  // Помечаем формы как инициализированные, чтобы избежать повторной инициализации
  pageFormWrappers.forEach((wrapper) => {
    wrapper.setAttribute('data-form-sender-initialized', 'true');
  });

  // Используем селектор, который исключает модальные окна
  const pageFormsSelector = '.form-wrapper:not(.modal .form-wrapper)';
  
  // Инициализируем FormSender только если есть формы на странице
  if (pageFormWrappers.length > 0) {
    new FormSender({
      formWrapper: pageFormsSelector, // только формы на странице, не в модальных окнах
      
      messager: new FormSenderMessager(
        // Обработчик успешной отправки формы
        msg => {
          if (window.Toast) {
            window.Toast.success(msg);
          } else {
            alert(msg);
          }
        },
        
        // Обработчик ошибок валидации / сети
        msg => {
          if (window.Toast) {
            window.Toast.error(msg);
          } else {
            alert(msg);
          }
        }
      )
    });
    
    // Помечаем, что инициализация выполнена
    formSenderInitialized = true;
  }
}

