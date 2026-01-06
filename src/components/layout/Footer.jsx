import React from 'react';
import styles from './Footer.module.css';
import packageJson from '../../../../package.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const appName = import.meta.env.VITE_APP_NAME || 'Sistema Hogar';
  const appVersion = import.meta.env.VITE_APP_VERSION || packageJson.version || '1.0.0';

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <p className={styles.copyright}>
            © {currentYear} {appName}. Todos los derechos reservados.
          </p>
          <p className={styles.version}>
            Versión {appVersion}
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <div className={styles.footerLinks}>
            <a href="/terminos" className={styles.footerLink}>
              Términos de uso
            </a>
            <a href="/privacidad" className={styles.footerLink}>
              Política de privacidad
            </a>
            <a href="/soporte" className={styles.footerLink}>
              Soporte
            </a>
            <a href="/contacto" className={styles.footerLink}>
              Contacto
            </a>
          </div>
        </div>
        
        <div className={styles.footerSection}>
          <p className={styles.techStack}>
            Desarrollado con React, Node.js, PostgreSQL y ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;