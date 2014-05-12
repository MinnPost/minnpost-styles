/**
 * This is a hack around the fact that StoryMap defines a submodule in itself
 * and not itself.  So we have to make the submodule global so it can be
 * referenced in StoryMap, and then return the actual object we want.
 * Also StoryMap comes with Leaflet.
 */

define(['storymap-orig'], function(s, L) {
  window.vcoanimate = s;
  return window.VCO;
});
