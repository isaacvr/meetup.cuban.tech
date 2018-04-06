/**
 *  @author: Isaac Vega Rodriguez          <isaacvega1996@gmail.com>
 */
'use strict';

(function() {

  var __dictionary = {
    en : {
      about          : "About us",
      blog           : "Blog",
      buyStuff       : "Buy Stuff",
      bylaws         : "Bylays",
      codeOfConduct  : "Code of Conduct",
      collaborations : "Collaborations",
      community      : "Comunity",
      conferences    : "Conferences",
      constitution   : "Constitution",
      contactUs      : "Contact us",
      donations      : "Donations",
      facebook       : "Facebook",
      faq            : "FAQ",
      followUs       : "Follow us",
      getInvolved    : "Get Involved",
      governance     : "Governance",
      meetups        : "Meet-Ups",
      news           : "News",
      home           : "Home",
      overview       : "Overview",
      sponsorship    : "Sponsorship",
      supportUs      : "Support Us",
      terms          : "Terms",
      thanks         : "Thanks",
      twitter        : "Twitter",
      privacy        : "Privacy",
    },
    es : {
      about          : "Quienes somos",
      home           : "Inicio",
      followUs       : "Síguenos",
      overview       : "Acerca de nosotros",
      sponsorship    : "Patrocinio",
      faq            : "FAQ",
      contactUs      : "Contáctenos",
      governance     : "Govierno",
      constitution   : "Constitución",
      bylaws         : "Leyes",
      community      : "Comunidad",
      meetups        : "Encuentros",
      conferences    : "Conferencias",
      collaborations : "Colaboraciones",
      getInvolved    : "Involúcrate",
      codeOfConduct  : "Codigo de Conducta",
      supportUs      : "Apóyanos",
      donations      : "Donaciones",
      buyStuff       : "Comprar",
      thanks         : "Gracias",
      news           : "Noticias",
      blog           : "Blog",
      twitter        : "Twitter",
      facebook       : "Facebook",
      privacy        : "Privacidad",
      terms          : "Términos",
    },
  };

  var __config = {
    dictionary : __dictionary,
    visual : {
      marketing : {
        height : "350px",
        display : "grid"
      }
    },
    lang : "en",
    langMap : {
      en : "English",
      gb : "English",
      es : "Español",
      pt : "Português",
      fr : "Français",
    },
    langList : [
      "en",
      "es",
      /*"pt",
      "fr"//*/
    ],
    language : {
      en : "Language",
      es : "Idioma"
    },
    head : {
      metadata : [
        {
          name : "description",
          content : "The Cuban Tech Group is a non-profit providing a foundation for open, collaborative technology development as well as promotion of use of technologic products and services; providing outreach and education to help more people access computing and technology making, especially among youth and underserved communities; creating an independent legal entity to which companies and individuals can donate resources and be assured that they will be used to develop the Cuban (private) technology ecosystem; providing means for Cuban entrepreneurs to know how to shelter their business from legal suits directed at technology development projects; protecting affiliated technology brands."
        },
        {
          name : "author",
          content : "The Cuban Tech Group"
        }
      ],
      title : "The homepage of the Cuban Tech Group"
    },
    navBar : [
      {
        label : "home",
        options : [
          {
            label : "overview",
            href : "about.html"
          },
          {
            label : "sponsorship",
            href : "sponsors.html"
          },
          {
            label : "faq",
            href : "faq.html"
          },
          {
            label : "contactUs",
            href : "contact.html"
          },
          {
            label : "hola",
            href : "hola.html"
          },
          {
            label : "",
            class : "divider hidden-xs hidden-sm",
            role : "separator"
          },
          {
            label : "governance",
            class : "dropdown-header hidden-xs hidden-sm"
          },
          {
            label : "constitution",
            href : "legal.html"
          },
          {
            label : "bylaws",
            href : "bylaws.html"
          }
        ]
      },
      {
        label : "community",
        options : [
          {
            label : "meetups",
            href : "events.html#meetups"
          },
          {
            label : "conferences",
            href : "events.html#conf"
          },
          {
            label : "collaborations",
            href : "events.html#collab"
          },
          {
            label : "",
            class : "divider hidden-xs hidden-sm",
            role : "separator"
          },
          {
            label : "getInvolved",
            href : "participate.html"
          },
          {
            label : "codeOfConduct",
            href : "coc.html"
          }
        ]
      },
      {
        label : "supportUs",
        options : [
          {
            label : "sponsorship",
            href : "sponsors.html"
          },
          {
            label : "donations",
            href : "donate.html"
          },
          {
            label : "buyStuff",
            href : "store.html"
          },
          {
            label : "thanks",
            href : "thanks.html"
          }
        ]
      },
      {
        label : "news",
        options : [
          {
            label : "blog",
            href : "http://blog.cuban.tech",
            icon : "blogger"
          },
          {
            label : "twitter",
            href : "http://twitter.com/TheCubanTech",
            icon : "twitter"
          },
          {
            label : "facebook",
            href : "http://www.facebook.com/CubanTech",
            icon : "fb"
          }
        ]
      }
    ],
    carousel : [
      {
        imageUrl : "img/1.jpg",
        alt : "First slide",
        headline : "Example headline.",
        content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio nobis quas, in est veniam. Veritatis obcaecati, officiis temporibus voluptatem illum nisi laudantium impedit cupiditate. Voluptate laborum perferendis tempora libero dicta.",
        buttons : [
          {
            href : "#",
            text : "Let's do it"
          }
        ],
        class : "active"
      },
      {
        imageUrl : "img/2.jpg",
        alt : "Second slide",
        headline : "Another example headline.",
        content : "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.",
        buttons : [
          {
            href : "#",
            text : "Learn More"
          }
        ],
        class : ""
      },
      {
        imageUrl : "img/3.jpg",
        alt : "Third slide",
        headline : "One more for good measure.",
        content : "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.",
        buttons : [
          {
            href : "#",
            text : "Browse gallery"
          }
        ],
        class : ""
      },
      {
        imageUrl : "img/4.jpg",
        alt : "Fourth slide",
        headline : "This is a custom slide.",
        content : "The only way that you can reach your dream is going to bed.",
        buttons : [
          {
            href : "#",
            text : "Accelerate rabbits"
          }
        ],
        class : ""
      },
      {
        imageUrl : "img/5.jpg",
        alt : "Fifth slide",
        headline : "Quinto slide",
        content : "HOLAAAAAA, este es un slide que acabo de crear ahora",
        buttons : [
          {
            href : "#",
            text : "Mi boton"
          }
        ],
        class : ""
      },//*/
    ],
    contacts : [
      {
        code : "blogger",
        href : "https://blog.cuban.tech"
      },
      {
        code : "twitter",
        href : "https://twitter.com/TheCubanTech"
      },
      {
        code : "fb",
        href : "https://www.facebook.com/TheCubanTech"
      },
      {
        code : "youtube",
        href : "#"
      }//*/
    ],
    marketing : {
      en : [
        {
          icon : "tech",
          label : "Technology",
          content : "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.",
          btnLabel : "View details"
        },
        {
          icon : "edu",
          label : "Education",
          content : "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
          btnLabel : "View details"
        },
        {
          icon : "users",
          label : "Community",
          content : "Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
          btnLabel : "View details"
        }
      ],
      es : [
      ]
    },
    featurette : [
      {
        heading : "First featurette heading.",
        headingMuted : "It'll blow your mind.",
        content : "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.",
        direction : "left",
        image : "img/3.jpg"
      },
      {
        heading : "Oh yeah, it's that good.",
        headingMuted : "See for yourself.",
        content : "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.",
        direction : "right",
        image : "img/5.jpg"
      },
      {
        heading : "And lastly, this one.",
        headingMuted : "Checkmate.",
        content : "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.",
        direction : "left",
        image : "img/4.jpg"
      },
      {
        heading : "AKJJsdk alksd slakj",
        headingMuted : "HELLOU",
        content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae quasi saepe tenetur ipsam reiciendis ut in magnam ea rerum perspiciatis. Facilis, repudiandae hic sunt consequuntur magnam doloribus aliquam repellat architecto.",
        direction : "right",
        image : "img/2.jpg"
      }//*/
    ],
    footer : [
      {
        header : "about",
        items : [
          [
            {
              label : "overview",
              href : "about.html"
            },
            {
              label : "sponsorship",
              href : "sponsors.html"
            },
            {
              label : "faq",
              href : "faq.html"
            },
            {
              label : "contactUs",
              href : "contact.html"
            },
            {
              label : "constitution",
              href : "legal.html"
            },
            {
              label : "bylaws",
              href : "bylaws.html"
            },
            {
              label : "privacy",
              href : "privacy.html"
            },
            {
              label : "terms",
              href : "tos.html"
            }
          ]
        ]
      },
      {
        header : "supportUs",
        items : [
          [
            {
              label : "sponsorship",
              href : "sponsors.html"
            },
            {
              label : "donations",
              href : "donate.html"
            },
            {
              label : "buyStuff",
              href : "store.html"
            },
            {
              label : "thanks",
              href : "thanks.html"
            },
          ]
        ]
      },
      {
        header : "community",
        items : [
          [
            {
              label : "meetups",
              href : "events.html#meetups"
            },
            {
              label : "conferences",
              href : "events.html#conf"
            },
            {
              label : "collaborations",
              href : "events.html#collab"
            },
          ],
          [
            {
              label : "getInvolved",
              href : "participate.html"
            },
            {
              label : "codeOfConduct",
              href : "coc.html"
            },
          ]
        ]
      }
    ],
    signature : {
      en : "The Cuban Tech Group. All rights reserved.",
      es : "El Grupo de Cuban Tech. Todos los derechos reservados."
    },
    organigram : {
      name        : "Olemis Lang",
      title       : "ceo",
      email       : "olemis.lang@gmail.com",
      twitter     : "olemislang",
      linkedin    : "ololo",
      description : "Python Software Foundation Member",
      children : [
        {
          name        : "Isaac Vega",
          title       : "developer",
          email       : "isaacvega1996@gmail.com",
          description : "Beginner web developer",
          children : [
            {
              name     : "Hector Dieguez",
              title    : "electronico",
              email    : "hector@gmail.com",
              twitter  : "hectord"
            },
            {
              name     : "Carlos Perez",
              title    : "dictador",
              email    : "carlos@gmail.com",
              twitter  : "carlosmpp",
              linkedin : "cmanuelpp"
            }
          ]
        },
        {
          name        : "Mauricio Fuentes",
          title       : "developer",
          email       : "mauricio@yandex.com",
          twitter     : "mauricioft",
          linkedin    : "elmauri",
          avatar      : "img/avatar.jpeg",
          description : "Desarrollador fullstack. Especializado en el diseño de plataformas basadas en UNIX. Fundador de MXS Solutions, miembro del grupo de desarrollo de Bootstrap en Twitter Inc.",
          children : [
            {
              name  : "Pablo Salgado",
              title : "lavandero"
            },
            {
              name  : "Sofia Puentes",
              title : "secretaria"
            }
          ]
        },
      ]
    },
    thisYear : (new Date()).getFullYear()
  };

  var nodeTemplate = function nodeTemplate(data) {

    /**

      @params: data

      data:
        - name          -->      Nombre de la persona
        - title         -->      Cargo
        - avatar        -->      Avatar
        - email         -->      Correo electronico
        - twitter       -->      Cuenta de twitter
        - linkedin      -->      Cuenta de linkedin

    //*/

    data.avatar = data.avatar || "img/anonimUser.png";
    data.email = data.email || '';
    data.twitter = data.twitter || '';
    data.linkedin = data.linkedin || '';
    data.description = data.description || 'no description available';

    return `
      <div class="orgComponent col-xs-1">
        <div class="row">
          <div class="col-xs-12 featurette-container">
            <img src="${data.avatar}" value="${data.avatar}" class="orgAvatar" data-toggle="modal" data-target="#myModal">
          </div>
          <div class="col-xs-12 orgName" value="${data.name}">
            <span>${data.name}</span>
          </div>
          <div class="col-xs-12 orgCharge" value="${data.title}">
            <span>${data.title}</span>
          </div>
          <div class="col-xs-12 orgContacts">
            <ul class="col-xs-12">
              <li class="orgIcon fa fa-envelope col-xs-4">
                <span class="orgIconDescriptor" value="${data.email}"></span>
              </li>
              <li class="orgIcon fa fa-twitter col-xs-4">
                <span class="orgIconDescriptor" value="${data.twitter}"></span>
              </li>
              <li class="orgIcon fa fa-linkedin col-xs-4">
                <span class="orgIconDescriptor" value="${data.linkedin}"></span>
              </li>
            </ul>
          </div>
          <div class="hidden orgDescription">
            ${data.description}
          </div>
        </div>
      </div>`;
  };

  var contactTemplate = function contactTemplate(data) {

    return `
      <li class="orgIcon fa fa-${data.type}">
        <span class="modal-usercontact">${data.value}</span>
      </li>
    `;

  };

  if ( $('#organigram').length > 0 ) {

    $('#organigram').orgchart({
      data         : __config.organigram,
      nodeTemplate : nodeTemplate
    });

    $('.orgAvatar').click(function(e) {

      var __root = e.target.parentElement.parentElement;

      var avatar   = $(__root).find('.orgAvatar').attr('value');
      var name     = $(__root).find('.orgName').attr('value');
      var charge   = $(__root).find('.orgCharge').attr('value');
      var desc     = $(__root).find('.orgDescription').html().trim();
      var email    = $(__root)
                        .find('.orgIcon.fa-envelope')
                        .find('.orgIconDescriptor')
                        .attr('value');

      var twitter  = $(__root)
                        .find('.orgIcon.fa-twitter')
                        .find('.orgIconDescriptor')
                        .attr('value');

      var linkedin = $(__root)
                        .find('.orgIcon.fa-linkedin')
                        .find('.orgIconDescriptor')
                        .attr('value');

      var modal        = $('#myModal');
      var mtitle       = modal.find('.modal-title');           // cargo
      var mavatar      = modal.find('.modal-avatar');          // avatar
      var musername    = modal.find('.modal-username');        // nombre
      var musertype    = modal.find('.modal-usertype');        // cargo
      var muserdesc    = modal.find('.modal-userdescription'); // descripcion
      var mcontactlist = modal.find('.modal-contactlist');     // contactos

      mtitle.text(charge);
      mavatar.attr('src', avatar);
      musername.text(name);
      musertype.text(charge);

      var clist = '';

      if (email != '') {
        clist += contactTemplate({ type : "envelope", value : email });
      }

      if (twitter != '') {
        clist += contactTemplate({ type : "twitter", value : twitter });
      }

      if (linkedin != '') {
        clist += contactTemplate({ type : "linkedin", value : linkedin });
      }

      mcontactlist.html(clist);
      muserdesc.html(desc);

    });//*/

  }

  window.GENERAL_CONFIG = __config;

})();