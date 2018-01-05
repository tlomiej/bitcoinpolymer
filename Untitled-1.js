!INC Local Scripts.EAConstants-JScript

/*
 * An example of working with attributes.
 *
 * NOTE: Requires an element to be selected in the Project Browser
 *
 * Related APIs
 * =================================================================================
 * Attribute API - http://www.sparxsystems.com.au/EAUserGuide/index.html?attribute.htm
 */
function AttributeLifeCycleExample()
{
	// Show the script output window
	Repository.EnsureOutputVisible( "Script" );

	// Get the currently selected element in the tree to work on
	var theElement as EA.Element;
	theElement = Repository.GetTreeSelectedObject();
	
	if ( theElement != null && theElement.ObjectType == otElement )
	{
		var addedAttributeID = 0;

		Session.Output( "JScript ATTRIBUTE LIFE CYCLE EXAMPLE" );
		Session.Output( "=======================================" );
		Session.Output( "Working on element '" + theElement.Name + "' (Type=" + theElement.Type +
			", ID=" + theElement.ElementID + ")" );
		
		// ==================================================
		// ADD AN ATTRIBUTE
		// ==================================================
		// Create an attribute to work on
		var attributes as EA.Collection;
		attributes = theElement.Attributes;
		
		var newAttribute as EA.Attribute;
		newAttribute = attributes.AddNew( "m_number", "int" );
		newAttribute.Update();
		attributes.Refresh();
		
		addedAttributeID = newAttribute.AttributeID;
		
		Session.Output( "Added attribute: " + newAttribute.Name +
			"(Type=" + newAttribute.Type +
			", ID=" + addedAttributeID + ")" );
		
		// ==================================================
		// MANAGE ATTRIBUTE CONSTRAINTS
		// ==================================================
		// Add an attribute constraint
		var constraints as EA.Collection;
		constraints = newAttribute.Constraints;
		
		var newConstraint as EA.AttributeConstraint;
		newConstraint = constraints.AddNew( "> 123", "Precision" );
		newConstraint.Update();
		constraints.Refresh();
		
		Session.Output( "Added constraint: " + newConstraint.Name );
		
		// Search the constraint collection for the added constraint and delete it
		for ( var i = 0; i < constraints.Count ; i++ )
		{
			var currentConstraint as EA.AttributeConstraint;
			currentConstraint = constraints.GetAt( i );
			
			Session.Output( "Attribute Constraint: " + currentConstraint.Name );
			
			// Delete the constraint we just added
			if ( currentConstraint.Name == "> 123" )
			{
				constraints.DeleteAt( i, false );
				Session.Output( "Deleted Constraint: " + currentConstraint.Name );
			}
		}
		
		constraints = null;
		
		// ==================================================
		// MANAGE ATTRIBUTE TAGGED VALUES
		// ==================================================
		// Add a tagged value
		var tags as EA.Collection;
		tags = newAttribute.TaggedValues;
		
		var newTag as EA.AttributeTag;
		newTag = tags.AddNew( "MyAttributeTag", "Number" );
		newTag.Update();
		tags.Refresh();
		
		var newTagID = newTag.TagID;
		Session.Output( "Added tag: " + newTag.Name + " (ID=" + newTagID  + ")" );
		
		newTag = null;
		
		// Search the tag collection for the added tag and delete it
		for ( var i = 0; i < tags.Count ; i++ )
		{
			var currentTag as EA.AttributeTag;
			currentTag = tags.GetAt( i );
			
			Session.Output( "Attribute Tag: " + currentTag.Name );
			
			// Delete the tag we just added
			if ( currentTag.Name == "MyAttributeTag" )
			{
				tags.DeleteAt( i, false );
				Session.Output( "Deleted Tag: " + currentTag.Name + 
					" (ID=" + currentTag.TagID + ")" );
			}
		}
		
		tags = null;
		
		// ==================================================
		// LIST AND DELETE ATTRIBUTES
		// ==================================================
		newAttribute = null;
		
		// List attributes
		for ( var i = 0 ; i < attributes.Count ; i++ )
		{
			var currentAttribute as EA.Attribute;
			currentAttribute = attributes.GetAt( i );
			
			Session.Output( "Attribute: " + currentAttribute.Name  );
			
			// Delete the attribute we added
			if ( currentAttribute.AttributeID == addedAttributeID )
			{
				attributes.DeleteAt( i, false );
				Session.Output( "Deleted Attribute: " + currentAttribute.Name +
					" (Type=" + currentAttribute.Type +
					", ID=" + currentAttribute.AttributeID + ")" );
			}
		}
		
		Session.Output( "Done!" );
	}
	else
	{
		// No item selected in the tree, or the item selected was not an element
		Session.Prompt( "This script requires an element be selected in the Project Browser.\n" +
			"Please select an element in the Project Browser and try again.", promptOK );
	}
}

AttributeLifeCycleExample();
