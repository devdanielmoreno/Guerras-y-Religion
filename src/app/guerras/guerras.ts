import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'aplicacion',
  templateUrl: 'guerras.html',
  styleUrls: ['guerras.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})

export class Guerras {
  seleccionado: number = 0;
  titulos: string[] = ['La guerra santa', 'Guerra Fría', 'Guerra en los Balcanes'];
  textos: string[] = [

    `La noción de la "Guerra Santa" en el Islam, conocida como yihad, abarca un concepto complejo que ha sido interpretado de diversas maneras a lo largo de la historia. Mientras algunos la entienden como un llamado a la lucha armada, es crucial destacar que existe una amplia gama de interpretaciones,\n y no todos los musulmanes la ven como una justificación para la violencia.
    La yihad se ha asociado con motivos como la defensa contra la opresión, la persecución de musulmanes y, en algunos casos, la expansión justa del Islam. La jerarquía de causas justas incluye la lucha contra la injusticia como la más noble. Sin embargo, es esencial subrayar que la interpretación pacífica y espiritual de la yihad es adoptada por la mayoría de los musulmanes en la actualidad. Este resumen busca ofrecer una comprensión equilibrada de la Guerra Santa en el Islam, reconociendo su diversidad de interpretaciones y destacando el énfasis de la mayoría de los musulmanes en la promoción de la paz y la convivencia pacífica.`,
    

    `Aunque la Guerra Fría fue principalmente un conflicto ideológico y político entre Estados Unidos y la Unión Soviética, también hubo implicaciones religiosas. La Iglesia Católica desempeñó un papel en la resistencia contra el comunismo en Europa del Este, especialmente en países como Polonia con el movimiento sindical Solidaridad liderado por Lech Walesa. En los países del bloque comunista, la práctica religiosa estaba a menudo restringida y la ideología oficial del comunismo promovía un ateísmo estatal. La Iglesia Católica y otras instituciones religiosas fueron perseguidas en varios lugares, especialmente en la Unión Soviética y sus satélites.
    En muchos países occidentales, la lucha contra el comunismo estuvo vinculada con valores religiosos. El anticomunismo fue a menudo presentado como una defensa contra una ideología que era percibida como ateísta y hostil hacia las creencias religiosas.`,
    

    `Los conflictos en la antigua Yugoslavia fueron complejos y tenían diversas dimensiones, incluyendo las étnicas y religiosas. En algunos casos, como en Bosnia y Herzegovina, se produjeron enfrentamientos entre comunidades católicas, ortodoxas y musulmanas.
    En algunos casos, la identidad religiosa también desempeñó un papel en los conflictos. Por ejemplo, la Guerra de Bosnia (1992-1995) involucró tensiones entre comunidades musulmanas, ortodoxas serbias y croatas católicas. Las disputas territoriales, especialmente en lugares como Kosovo y Bosnia y Herzegovina, fueron una causa importante. Grupos étnicos diferentes reclamaban territorios disputados, lo que llevó a conflictos violentos por el control y la autonomía.`
  ];

  constructor(private clipboard: Clipboard) {}

  copiarTexto() {
    let textoACopiar = `
      ${this.titulos[this.seleccionado]}
      ${this.textos[this.seleccionado]}
    `;
    this.clipboard.copy(textoACopiar);
  }

  imagenes = [
    { src: './assets/guerra4.jpg' },
    { src: './assets/guerra2.jpg' },
    { src: './assets/guerra3.jpg' },
    { src: './assets/guerra4.png' },
  ];



}
