//*** Model ***
Character = Backbone.Model.extend({

});


//*** Collection **
CharacterCollection = Backbone.Collection.extend({
  model: Character
})


//*** Views ***
CharacterView = Backbone.View.extend({
  tagName: 'li',
  render: function(){
    this.$el.html(
      this.model('name'))
    return this;
  }

});
