<?php

/**
 * Plugin Name: CoBlocks
 * Description: Custom WordPress.com CoBlocks fork.
 *
 * Our CoBlocks fork is a mu-plugin and it's loaded by default using this loader.
 * This includes additional logic to check if another version of CoBlocks is
 * present. If that's the case, it'll take precedence over this one.
 **/
if ( defined( 'IS_ATOMIC' ) && IS_ATOMIC ) {
  function load_coblocks() {
    $load_mu_coblocks = function() { require_once( WPMU_PLUGIN_DIR . '/coblocks/class-coblocks.php' ); };

    $is_activating_coblocks = (isset($_GET['action']) && isset($_GET['plugin'])) &&
      ($_GET['action'] == 'activate' && $_GET['plugin'] == 'coblocks/class-coblocks.php');

    $official_coblocks_present = in_array('coblocks/class-coblocks.php', get_option('active_plugins'), TRUE);

    if (!$is_activating_coblocks && !$official_coblocks_present) {
      $load_mu_coblocks();
    }
  }
  add_action( 'plugins_loaded', 'load_coblocks' );
}
