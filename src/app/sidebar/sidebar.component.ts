import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#toggle-btn').click(function() {
      $('.sidebar').toggleClass('active');
      $('.sidebar .sidebar-inner .sidebar-menu > li > a .title').toggleClass('active');
      $('.page').toggleClass('active');
      $('.header').toggleClass('active');

    });

    // $('#dropdown-tg').click(function() {
    //   $('.dropdown-menu').toggleClass('active');
    // });
    // $('.dropdown-toggle').click(function() {
    //   $('.dropdown-menu').toggleClass('active');
    // });
    $('.sidebar .sidebar-menu li a').on('click', function () {
      const $this = $(this);

      if ($this.parent().hasClass('open')) {
        $this
          .parent()
          .children('.dropdown-menu')
          .slideUp(200, () => {
            $this.parent().removeClass('open');
          });
      } else {
        $this
          .parent()
          .parent()
          .children('li.open')
          .children('.dropdown-menu')
          .slideUp(200);

        $this
          .parent()
          .parent()
          .children('li.open')
          .children('a')
          .removeClass('open');

        $this
          .parent()
          .parent()
          .children('li.open')
          .removeClass('open');

        $this
          .parent()
          .children('.dropdown-menu')
          .slideDown(200, () => {
            $this.parent().addClass('open');
          });
      }
    });

    // Sidebar Activity Class
    // const sidebarLinks = $('.sidebar').find('.sidebar-link');
    //
    // sidebarLinks
    //   .each((index, el) => {
    //     $(el).removeClass('active');
    //   })
    //   .filter(function () {
    //     const href = $(this).attr('href');
    //     const pattern = href[0] === '/' ? href.substr(1) : href;
    //     return pattern === (window.location.pathname).substr(1);
    //   })
    //   .addClass('active');

    // ٍSidebar Toggle
    $('.sidebar-toggle').on('click', e => {
      $('.app').toggleClass('is-collapsed');
      e.preventDefault();
    });

    /**
     * Wait untill sidebar fully toggled (animated in/out)
     * then trigger window resize event in order to recalculate
     * masonry layout widths and gutters.
     */
    $('#sidebar-toggle').click(e => {
      e.preventDefault();
      setTimeout(() => {
        window.dispatchEvent(window.event);
      }, 300);
    });
  }
}
