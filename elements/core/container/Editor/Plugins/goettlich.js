const goettlich_command = {
  // @Required @Unique
  // plugin name
  name: 'goettlich_emoji',
  // @Required
  // data display
  display: 'command',

  // @Options
  title: 'Göttlich Emoji',
  buttonClass: 'emoji-btn',
  innerHTML: '<img class="derp-emoji-btn" src="/assets/images/goettlich.png">',

  // @Required
  // add function - It is called only once when the plugin is first run.
  // This function generates HTML to append and register the event.
  // arguments - (core : core object, targetElement : clicked button element)
  add: function (core, targetElement) {
      const context = core.context;
      const rangeTag = core.util.createElement('div');
      core.util.addClass(rangeTag, '__se__format__range_custom');

      // @Required
      // Registering a namespace for caching as a plugin name in the context object
      context.customCommand = {
          targetButton: targetElement,
          tag: rangeTag
      };
  },

  // @Override core
  // Plugins with active methods load immediately when the editor loads.
  // Called each time the selection is moved.
  active: function (element) {
      if (!element) {
          this.util.removeClass(this.context.customCommand.targetButton, 'active');
      } else if (this.util.hasClass(element, '__se__format__range_custom')) {
          this.util.addClass(this.context.customCommand.targetButton, 'active');
          return true;
      }

      return false;
  },

  // @Required, @Override core
  // The behavior of the "command plugin" must be defined in the "action" method.
  action: function () {
    const node = this.util.createElement("i");
    this.util.addClass(node, "custom-emoji");
    this.util.addClass(node, "goettlich-emoji");
    node.contentEditable = false;
    this.insertNode(node);
    const zeroWidthSpace = this.util.createTextNode(this.util.zeroWidthSpace);
    node.parentNode.insertBefore(zeroWidthSpace, node.nextSibling);
  }
}

export default goettlich_command;